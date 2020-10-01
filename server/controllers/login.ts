import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import express from "express";
import models from "../models";

import { SESSION_SECRET } from "../util/secrets";

const loginRouter = express.Router();

loginRouter.post("/", async (request, response) => {
  const { email, password } = request.body;

  models.User.findOne({ email: email }).then(async (user) => {
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.password);

    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: "invalid username or password",
      });
    }

    const payload = {
      user: {
        email: user.email,
        id: user._id,
      },
    };

    const token = jwt.sign(payload, SESSION_SECRET);

    response.status(200).send({ token, email: user.email, name: user.name });
  });
});

export { loginRouter };
