const RedisClient = require("../config/connectRedis");

const sendMessage = async () => {
  try {
    let date = new Date();
    let minutes = date.getMinutes();
    let hour = date.getHours();
    const schedule = await RedisClient.get("schedule");
    const parsedSchedule = JSON.parse(schedule);

    const index = hour - 9;
    if (minutes === 30) {
      //send a quote
      console.log("Keep Hustling");
    } else {
      if (index - 1 >= 0) {
        console.log(
          `Its time to start ${parsedSchedule[index]} task, was ${
            parsedSchedule[index - 1]
          } task complete?`
        );
      } else if (index === 0) {
        console.log("Start Your day with" + parsedSchedule[index]);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendMessage };
