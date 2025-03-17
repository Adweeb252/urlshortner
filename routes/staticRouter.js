const express = require("express");
const router = express.Router();
const URL = require("../models/url");
const { restrictTo } = require("../middlewares/auth");

router.get("/admin/url", restrictTo(["ADMIN"]), async (req, res) => {
  const allUrl = await URL.find({});
  return res.render("Home", {
    urls: allUrl,
  });
});

router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
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
