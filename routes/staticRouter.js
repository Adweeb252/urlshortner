const express = require("express");
const router = express.Router();
const URL = require("../models/url");

router.get("/", async (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  const allUrl = await URL.find({ createdBy: req.user._id });
  return res.render("Home", {
    urls: allUrl,
  });
});
router.get("/signup", (req, res) => {
  res.render("Signup");
});
router.get("/login", (req, res) => {
  res.render("login");
});
module.exports = router;
