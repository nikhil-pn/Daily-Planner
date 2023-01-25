const express = require("express");
const logger = require("morgan");
const app = express();

const PORT = 3001;

app.use(express.json());
app.use(logger("dev"));

app.listen(PORT, () => {
  console.log("Server is runnig");
});
