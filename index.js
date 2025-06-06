const express = require("express");
const app = express();
const urlRouter = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const { connectToDB } = require("./connection");
const ejs = require("ejs");
const path = require("path");
const URL = require("./models/url");
const { checkForAuthorization, restrictTo } = require("./middlewares/auth");
const cookieParser = require("cookie-parser");

const PORT = 8001;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthorization);
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

connectToDB("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("MongoDB is connected")
);

app.use("/url", restrictTo(["NORMAL"]), urlRouter);
app.use("/user", userRoute);
app.use("/", staticRoute);

app.listen(PORT, () => console.log(`Server is started at PORT:${PORT}`));
