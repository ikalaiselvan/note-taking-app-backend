import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import VerifyUser from "../model/verifyUser.js";
import User from "../model/User.js";
import sendEmail from "./SendMail.js";
dotenv.config();

async function InsertVerifyUser(name, email, password) {
  try {
    // converting hashed password for users password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const token = await generateWebToken(email);
      const userVerify = await VerifyUser.findOne({ email: email });

      if(userVerify){
        await VerifyUser.deleteOne({email: email});
      }

    const newUser = VerifyUser({
      name: name,
      email: email,
      password: hashedPassword,
      token: token,
    });

    // save datas in to database on 'VerifyUser' collection
    await newUser.save();

    // send conformation mail
    const activationLink = `http://localhost:5000/register/${token}`;

    const content = `<h4>Hi, there</h4>
        <h5>Welcome to the app </h5>
        <p>Thank you for the Register click for the below link to activate</p>
        <a href="${activationLink}">Click here</a>

        <p>Regards</p>
        <p>Kalaiselvan P</p>`;

    console.log(newUser);
    await sendEmail(email, "Verification link", content);

  } catch (error) {
    console.log(`catch error while InsertVerifyUser : ${error}`);
  }
}

async function generateWebToken(email) {
  const token = await jwt.sign(email, process.env.jwtRegisterPassword);
  return token;
}

async function InsertRegisterUser(token) {

  try {
    const userVerify = await VerifyUser.findOne({ token: token });
    if (userVerify) {
      const newUser = new User({
        name: userVerify.name,
        email: userVerify.email,
        password: userVerify.password,
        forgetPassword: {},
      });

      await newUser.save();
      await VerifyUser.deleteOne({ token: token });

      const content = `<h4>Registration successful</h4>
        <h5>Welcome to the app</h5>
        <p>You are successfully registered</p>
        
        <p>Regards</p>
        <p>Kalaiselvan P</p>`;

      await sendEmail(newUser.email, "Registration successfully", content);

      return `<h4>Registration successful</h4>
        <h5>Welcome to the app</h5>
        <p>You are successfully registered</p>
        
        <p>Regards</p>
        <p>Kalaiselvan P</p>`;
    }

    return `<h4>Registration failed</h4>
        <p>Link expired ...</p>
        
        <p>Regards</p>
        <p>Kalaiselvan P</p>`;
  } catch (error) {
    console.log(`catch error while verify token: ${error}`);

    return `
        <html>
        <body>
        <h4>Registration failed</h4>
        <p>something was happened</p>
        
        <p>Regards</p>
        <p>Kalaiselvan P</p>
        </body>
        </html>`;
  }
}

export { InsertVerifyUser, InsertRegisterUser };