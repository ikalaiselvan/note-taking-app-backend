const mongoose = require("mongoose");

// import mongoose from "mongoose";

const veryfySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
},
{
    collection: "VerifyUser"
});

const VerifyUser = mongoose.model("VerifyUser", veryfySchema);


module.exports = VerifyUser;

// export default VerifyUser;