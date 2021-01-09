const jwt = require("jsonwebtoken");

module.exports = {
  isAuthenticated: (req, res, next) => {
    if (typeof req.headers.authorization !== "undefined") {
      let token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(500).json({ error: "Token is not Authorized" });
        }
        if (decoded && decoded.role && decoded.role == "user") {
          return next();
        } else {
          return res.status(500).json({ error: "Token is not Authorized" });
        }
      });
    } else {
      return res.status(500).json({ error: "Token is not Authorized" });
    }
  },
};
