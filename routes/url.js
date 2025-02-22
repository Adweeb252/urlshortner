const express = require("express");
const router = express.Router();
const {
  createShortUrl,
  handleRedirect,
  handleAnalytics,
} = require("../controllers/url");

router.post("/", createShortUrl);

router.get("/:shortId", handleRedirect);

router.get("/analytics/:shortId", handleAnalytics);

module.exports = router;
