const scheduler = require("node-cron");

const { sendMessage } = require("../controllers/sendMessage");

const job = scheduler.schedule("*/30 * * * *", sendMessage, {
  scheduled: false,
  timezone: "Asia/Kolkata",
});
scheduler.schedule("0 9 * * *", () => {
  job.start();
});

scheduler.schedule("20 20 * * *", () => {
  job.stop();
});
