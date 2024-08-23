const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const api = require("./routes/api");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(morgan("combined"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/v1", api);

app.get("/*", (req, res) => {
  const filePath = path.join(__dirname, "..", "public", "index.html");
  console.log("Serving file:", filePath); // This should log the file path
  res.sendFile(filePath);
});

module.exports = app;
