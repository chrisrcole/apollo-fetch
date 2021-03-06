import bcrypt from "bcrypt";
import express from "express";
import models from "../models";
import { check, validationResult } from "express-validator";
import normalize from "normalize-url";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";

import { SESSION_SECRET } from "../util/secrets";

const usersRouter = express.Router();

// @route    POST api/users
// @desc     Register user
// @access   Public
usersRouter.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (request: any, response: any, next: any) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = request.body;

    const avatar = normalize(
      gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      }),
      { forceHttps: true }
    );

    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);

    const user = new models.User({
      name,
      email,
      avatar,
      password: hashPassword,
    });

    user
      .save()
      .then((user) => {
        const payload = {
          user: {
            email: user.email,
            id: user._id,
          },
        };
        const token = jwt.sign(payload, SESSION_SECRET);

        response.status(200).send({
          token,
          email: user.email,
          name: user.name,
        });
      })
      .catch((error) => {
        response
          .status(400)
          .json({ errors: [{ msg: error.errors.email.message }] });
        // next(error.errors.email.message);
      });
  }
);

usersRouter.get("/", async (request, response) => {
  await models.User.find({})
    .populate("apollos", {
      inputUrl: 1,
      shortUrl: 1,
    })
    .then((users) => {
      response.json(users.map((u) => u.toJSON()));
    });
});

export { usersRouter };
