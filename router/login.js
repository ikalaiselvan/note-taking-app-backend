import express from "express";
import { AuthenticateUser } from "../controllers/login.js";
import client from "../redis.js";

const router = express.Router();

// Remove the following lines:
client
  .connect()
  .then(() => {
    console.log("connected to redis ...");
  })
  .catch((e) => {
    console.log(e);
  });

router.post("/", async (req, res) => {
  try {
    const { email, password } = await req.body;
    var loginCredentials = await AuthenticateUser(email, password);

    if (loginCredentials === "Invalid User name and Password") {

      res.status(200).send("Invalid User name and Password");

    } else if (loginCredentials === "Server Busy") {

      res.status(200).send("Server Busy");
      
    } else {
      res.status(200).json({ token: loginCredentials.token });
    }
  } catch (error) {}
});

export default router;
