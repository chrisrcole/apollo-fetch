import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  avatar: string;
  createDate: Date;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  createDate: {
    type: Date,
    default: Date.now
  }
});

userSchema.plugin(uniqueValidator);

export const User = mongoose.model<IUser>("User", userSchema);
