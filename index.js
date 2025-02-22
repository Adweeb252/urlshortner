const express = require("express");
const app = express();
const urlRouter = require("./routes/url");
const { connectToDB } = require("./connection");

const PORT = 8001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectToDB("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("MongoDB is connected")
);
app.use("/url", urlRouter);

app.listen(PORT, () => console.log(`Server is started at PORT:${PORT}`));
