import express from "express";
import models from "../models";

import { nanoid, shortenLink } from "../services";

const apollosRouter = express.Router();

apollosRouter.get("/", async (request, response) => {
  models.Apollos.find({}).then((apollos) => {
    response.json(apollos.map((apollo) => apollo.toJSON()));
  });
});

apollosRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const base = request.protocol + "://" + request.get("host");
  if (!body.inputUrl) {
    response.status(400).json({ error: "url missing" });
  } else {
    const id = nanoid(5);
    const apollo = new models.Apollos({
      id: id,
      inputUrl: body.inputUrl,
      shortUrl: shortenLink(base, id),
      createDate: new Date(),
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

export { apollosRouter };
