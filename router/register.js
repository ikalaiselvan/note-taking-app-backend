import express from "express";
import {checkUser} from "../controllers/login.js";
import {InsertVerifyUser, InsertRegisterUser}  from "../controllers/register.js";

const router = express.Router();

router.get("/:token", async (req, res)=>{
    try {
        const response = await InsertRegisterUser(req.params.token);
        console.log(":token response : ",response )

        res.status(200).send(response);

    } catch (error) {
        console.log(`catch error while receive and check token : ${error}`);
        res.status(500).send(`
        <html>
        <body>
        <h4>Registration failed</h4>
        <p>something has happened</p>
        
        <p>Regards</p>
        <p>Kalaiselvan P</p>
        </body>
        </html>`)
    }
});

router.post("/verify", async (req, res)=>{

    try {
        const { name, email, password } = req.body;
        console.log(name, email, password);

        // Checking user aldready exist or not
        const userExist = await checkUser(email);

        if(userExist === false){

            await InsertVerifyUser(name, email, password);
            res.status(200).send(true);

        }else if(userExist === true){

            res.status(200).send(false);

        }else if(userExist === "Server Busy"){

            res.status(500).send("Server Busy");
        }

    } catch (error) {
        console.log("catch error while chicking verify user : ", error);
    }

})


export default router;