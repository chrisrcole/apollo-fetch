import express from "express";
import compression from "compression"; // compresses requests
import session from "express-session";
import bodyParser from "body-parser";
import mongo from "connect-mongo";
import cors from "cors";
import path from "path";
import morgan from "morgan";

import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";

import { shortenLink } from "./services";

const MongoStore = mongo(session);

// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
import Apollo from "./models/apollo";

// Express configuration
app.set("port", process.env.PORT || 5000);
app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: new MongoStore({
      url: mongoUrl,
      autoReconnect: true,
    }),
  })
);
app.use(
  express.static(path.join(__dirname, "../client/build"), {
    maxAge: 31557600000,
  })
);

app.get("/api/apollos", (request, response) => {
  Apollo.find({}).then((apollos) => {
    response.json(apollos.map((apollo) => apollo.toJSON()));
  });
});
app.post("/", (request, response, next) => {
  const body = request.body;
  if (!body.inputUrl) {
    response.status(400).json({ error: "url missing" });
  } else {
    const apollo = new Apollo({
      inputUrl: body.inputUrl,
      shortUrl: shortenLink(),
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

export default app;
