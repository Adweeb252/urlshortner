const User = require("../models/user");
async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    console.log("Invalid Username or Password");
    res.render("login");
  }
  res.redirect("/");
}

module.exports = { handleUserSignup, handleUserLogin };
