const express = require("express");
const logger = require("morgan");
const app = express();
const RedisClient = require("./config/connectRedis");
const PORT = 3001;
const sheduleRoutes = require("./routes/scheduleRoutes");
require("./services/scheduler")
app.use(express.json());
app.use(logger("dev"));
app.use(express.static("public"))

app.use("/api/v1/schedule",sheduleRoutes);

app.listen(PORT, () => {
  console.log("Server is runnig");
  RedisClient.connect()
    .then(() => {
      console.log("Connected to redis");
    })
    .catch((e) => {
      console.log(e, "DB failed to connect");
    });
});
