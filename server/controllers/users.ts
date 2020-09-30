import bcrypt from "bcrypt";
import express from "express";
import models from "../models";

const usersRouter = express.Router();

usersRouter.post("/", async (request, response) => {
  const body = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new models.User({
    email: body.email,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.json(savedUser);
});

usersRouter.get("/", async (request, response) => {
  const users = await models.User.find({}).populate("apollos", {
    inputUrl: 1,
    shortUrl: 1,
  });
  response.json(users.map((u) => u.toJSON()));
});

export { usersRouter };
