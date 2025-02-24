const express = require("express");
const router = express.Router();
const URL = require("../models/url");

router.get("/", async (req, res) => {
  const allUrl = await URL.find({});
  return res.render("Home", {
    urls: allUrl,
  });
});
router.get("/", (req, res) => {
  res.render("Signup");
});
router.get("/login", (req, res) => {
  res.render("login");
});
module.exports = router;
