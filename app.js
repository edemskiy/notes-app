const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/auth", require("./routes/auth"));

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
  })
  .catch(e => console.log("mongoConnectionError", e.message));
