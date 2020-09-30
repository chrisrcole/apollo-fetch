import express from "express";
import models from "../models";
import jwt from "jsonwebtoken";

import { SESSION_SECRET } from "../util/secrets";

import { nanoid, shortenLink } from "../services";

const apollosRouter = express.Router();

const getTokenFrom = (request: any) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

apollosRouter.get("/", async (request, response) => {
  models.Apollos.find({}).then((apollos) => {
    response.json(apollos.map((apollo) => apollo.toJSON()));
  });
});

apollosRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const base = request.protocol + "://" + request.get("host");

  const token = getTokenFrom(request);
  const decodedToken: any = jwt.verify(token, SESSION_SECRET).valueOf();
  console.log(decodedToken.user.id);
  if (!token || !decodedToken.user.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  models.User.findById(decodedToken.user.id).then((user) => {
    if (!body.inputUrl) {
      response.status(400).json({ error: "url missing" });
    } else {
      const id = nanoid(5);
      const apollo = new models.Apollos({
        id: id,
        inputUrl: body.inputUrl,
        shortUrl: shortenLink(base, id),
        createDate: new Date(),
        user: user._id,
      });
      apollo
        .save()
        .then((savedApollo) => savedApollo.toJSON())
        .then((savedAndFormattedApollo) => {
          response.json(savedAndFormattedApollo);
        })
        .catch((error) => next(error));
    }
  });
});

export { apollosRouter };
