const URL = require("../models/url");
const { nanoid } = require("nanoid");

async function createShortUrl(req, res) {
  const shortId = nanoid(8);
  if (!req.body) {
    return res.status(400).json({ error: "url is required" });
  }
  await URL.create({
    shortId: shortId,
    redirectedUrl: req.body.url,
    visitHistory: [],
  });
  return res.render("Home", {
    id: shortId,
  });
}

async function handleRedirect(req, res) {
  const shortId = req.params.shortId;
  console.log("Searching for shortId:", shortId); // Debug log

  const url = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
    { new: true }
  );

  console.log("Found URL:", url); // Debug log

  if (!url) {
    return res.status(404).json({ error: "url not found" });
  }
  res.redirect(url.redirectedUrl);
}

async function handleAnalytics(req, res) {
  const shortId = req.params.shortId;
  const url = await URL.findOne({ shortId });
  return res.status(200).json({
    totalClicks: url.visitHistory.length,
    analytics: url.visitHistory,
  });
}

module.exports = { createShortUrl, handleRedirect, handleAnalytics };
