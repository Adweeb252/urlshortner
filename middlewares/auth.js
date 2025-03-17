const { getUser } = require("../service/auth");

function checkForAuthorization(req, res, next) {
  const cookieToken = req.cookies.token;
  req.user = null;
  if (!cookieToken) return next();

  const token = cookieToken;
  const user = getUser(token);
  req.user = user;
  return next();
}

function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");
    if (!roles.includes(req.user.role)) return res.end("Unauthorized");
    return next();
  };
}

// async function restrictToLoggedInUser(req, res, next) {
//   const userid = req.headers["Authorization"];
//   console.log(req.headers);
//   if (!userid) {
//     return res.redirect("/login");
//   }
//   const token = userid.split("Bearer ")[1];
//   const user = getUser(token);
//   if (!user) {
//     return res.redirect("/login");
//   }

//   req.user = user;
//   next();
// }

// async function checkAuth(req, res, next) {
//   const userid = req.headers["authorization"];
//   const token = userid.split("Bearer ")[1];
//   console.log(token);
//   const user = getUser(token);

//   req.user = user;
//   next();
// }

module.exports = { checkForAuthorization, restrictTo };
