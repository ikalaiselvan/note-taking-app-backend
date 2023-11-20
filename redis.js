import redis from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = () => {
  return redis.createClient();
};


const client = redisClient();


client.on("error", (err)=>{
    console.log(err);
})

client.on("connect", ()=>{
    console.log("connected to redis");
})

client.on("end", ()=>{
    console.log("redis connection ended")
})

process.on("SIGQUIT", ()=>{
    client.quit();
})

export default client;