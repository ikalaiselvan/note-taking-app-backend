import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    data: [{
      id:{
        type: String,
        unique: true,
      },
      heading: {
        type: String,
        default: "heading",
      },
      body: {
        type: String,
      },
      background: {
        type: String,
      },
      date: {
        type: Date,
        default: new Date(),
      },
    }],
    forgetPassword: {
      time: {
        type: Date,
      },
      otp: {
        type: String,
      },
    },
    token: {
      type: String,
    },
  },
  {
    collection: "User",
  }
);

const User = mongoose.model("User", userSchema);

export default User;
