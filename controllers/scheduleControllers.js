const RedisClient = require("../config/connectRedis");
const webPush = require("web-push");

require("dotenv").config();

const publicKey = process.env.PUBLIC_KEY;
const privateKey = process.env.PRIVATE_KEY;

webPush.setVapidDetails("mailto:test@test.com", publicKey, privateKey)

const createSchedule = async (req, res) => {
  try {
    const { schedule , subscription} = req.body;
    await RedisClient.set("schedule", JSON.stringify(schedule));
    await RedisClient.set("subscription", JSON.stringify(subscription));
    const savedSchedule = await RedisClient.get("schedule");
    
    webPush.sendNotification(subscription, JSON.stringify({
      title: "Devsnest",
      body: "First push notfication"
    }))
    
    res.status(200).json({ message: savedSchedule });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: e });
  }
};
module.exports = { createSchedule };
