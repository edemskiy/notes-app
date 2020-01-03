const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const userToken = req.headers.auth.split(" ")[1];
  if (!userToken) {
    res.status(401).json({ message: "Unauthorized" });
  }

  const userInfo = jwt.verify(userToken, process.env.NOTES_APP_PRIVATE_KEY);
  req.userId = userInfo.userId;
  next();
}

module.exports = authMiddleware;
