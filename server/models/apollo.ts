import mongoose from "mongoose";
import bluebird from "bluebird";
import { MONGODB_URI } from "../util/secrets";

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
mongoose.Promise = bluebird;

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
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

const apolloSchema = new mongoose.Schema({
  inputUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  createDate: {
    type: Date,
    required: true,
  },
});

apolloSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export = mongoose.model("Apollo", apolloSchema);
