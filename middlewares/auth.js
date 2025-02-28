const { getUser } = require("../service/auth");

async function restrictToLoggedInUser(req, res, next) {
  console.log("Cookies:", req.cookies); // Debug log
  const userid = req.cookies?.uid;
  if (!userid) {
    return res.redirect("/login");
  }
  const user = getUser(userid);
  console.log("User:", user); // Debug log
  if (!user) {
    return res.redirect("/login");
  }

  req.user = user;
  next();
}

module.exports = { restrictToLoggedInUser };
