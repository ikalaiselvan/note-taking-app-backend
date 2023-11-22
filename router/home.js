const express = require("express");
const { AuthorizeUser } = require("../controllers/login.js");
const User = require("../model/User.js");

// import express from "express";
// import { AuthorizeUser } from "../controllers/login.js";
// import User from "../model/User.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const auth_token = req.headers.authorization;
    // console.log(auth_token);

    const loginCredentials = await AuthorizeUser(auth_token);

    if (loginCredentials.status === false) {
      res.status(400).send("Invalid Token");
      console.log("login false : ");
    } else {
      console.log("login cred : ", loginCredentials);
      res.status(200).send(loginCredentials);
    }
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: e.message || "Server Busy" });
  }
});

router.post("/data", async (req, res) => {
  try {
    const auth_token = req.headers.authorization;
    console.log("at: ",auth_token)
    console.log("re.body : ", req.body);

    const response = await User.findOneAndUpdate(
      { token: auth_token },
      { $set: { data: req.body } },
      { new: true }
    );
    console.log(response)

    res.status(200).send(response);

  } catch (error) {
    res.status(500).send(error);
  }
  
});

router.get("/data", async (req, res) => {
  try {
    const auth_token = req.headers.authorization;

    if (!auth_token) {
      return res.status(401).send("token not exist");
    }

    const response = await User.findOne({ token: auth_token });
    // console.log(response);

    if (!response) {
      return res.status(404).send("User not found with the provided token");
    }

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router;
// export default router;
