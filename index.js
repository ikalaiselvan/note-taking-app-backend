import express from "express";
import connectDb from "./db.js";
import registerRouter from "./router/register.js";
import loginRouter from "./router/login.js";
import homeRouter from "./router/home.js";

import cors from "cors";

const app = express();
app.use(express.json());  // middleware for sending request '(post)' to change json formate 
app.use(cors({origin: "*"}));  // middleware to connect with other domains


const port = process.env.PORT;


connectDb();    // connection to database

app.use("/home", homeRouter);

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/home", homeRouter);




app.listen(port, ()=>console.log("Node is running on port: ", port));