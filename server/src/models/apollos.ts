import mongoose from "mongoose";

const apollosSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  inputUrl: {
    type: String,
    required: true
  },
  shortUrl: {
    type: String,
    required: true
  },
  createDate: {
    type: Date,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

export const Apollos = mongoose.model("Apollos", apollosSchema);
