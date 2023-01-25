const { response } = require("express");
const RedisClient = require("../config/connectRedis");

const createSchedule = async (req, res) => {
  try {
    const { schedule } = req.body;
    await RedisClient.set("schedule", JSON.stringify(schedule));
    const savedSchedule = RedisClient.get("schedule");
    res.status(200).json({ message: savedSchedule });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: e });
  }
};
module.exports = { createSchedule };
