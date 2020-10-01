import express from "express";
import compression from "compression"; // compresses requests
import session from "express-session";
import bodyParser from "body-parser";
import mongo from "connect-mongo";
import mongoose from "mongoose";
import bluebird from "bluebird";
import cors from "cors";
import morgan from "morgan";

import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";

import models from "./models";
import controllers from "./controllers";

const MongoStore = mongo(session);

// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
mongoose.Promise = bluebird;

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    console.log("MongoDB connected.");
  })
  .catch((err) => {
    console.log(
      `MongoDB connection error. Please make sure MongoDB is running. ${err}`
    );
    // process.exit();
  });

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
      autoReconnect: true
    })
  })
);
app.use(
  express.static("../client/build", {
    maxAge: 31557600000
  })
);

// app.get("/", (request, response) => {
//   response.send("The index page");
// });

app.use("/api/users", controllers.usersRouter);
app.use("/api/apollos", controllers.apollosRouter);
app.use("/api/login", controllers.loginRouter);

app.get("/:id", (request, response, next) => {
  models.Apollos.findOne({ id: request.params.id })
    .then((apollo) => {
      if (apollo) {
        response.redirect(302, apollo.toJSON().inputUrl);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

export default app;
