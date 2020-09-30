import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import express from "express";
import models from "../models";

import { SESSION_SECRET } from "../util/secrets";

const loginRouter = express.Router();

loginRouter.post("/", async (request, response) => {
  const { email, password } = request.body;

  models.User.findOne({ email: email })
    .then((user) => user.toJSON())
    .then(async (formattedUser) => {
      const passwordCorrect =
        formattedUser === null
          ? false
          : await bcrypt.compare(password, formattedUser.password);

      if (!(formattedUser && passwordCorrect)) {
        return response.status(401).json({
          error: "invalid username or password",
        });
      }

      const userForToken = {
        email: formattedUser.email,
        id: formattedUser._id,
      };

      const token = jwt.sign(userForToken, SESSION_SECRET);

      response
        .status(200)
        .send({ token, email: formattedUser.email, name: formattedUser.name });
    });
});

export { loginRouter };
