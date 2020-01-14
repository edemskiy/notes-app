const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/notes", require("./routes/notes.routes"));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
  })
  .catch(e => console.log("mongoConnectionError", e.message));
