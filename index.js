// import connectDb from "./db.js";
// import registerRouter from "./router/register.js";
// import loginRouter from "./router/login.js";
// import homeRouter from "./router/home.js";
// import cors from "cors";

const registerRouter = require("./router/register.js");
const loginRouter = require("./router/login.js");
const homeRouter = require("./router/home.js");
const cors = require("cors");

const express = require("express");
const connectDb = require("./db");

const app = express();

app.use(express.json()); // middleware for sending request '(post)' to change json formate
app.use(cors({ origin: "*" })); // middleware to connect with other domains

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("successfully node server created...");
});

connectDb(); // connection to database

app.use("/home", homeRouter);

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/home", homeRouter);

app.listen(port, () => console.log("Node is running on port: ", port));
