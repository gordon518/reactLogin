const jwt = require("jsonwebtoken");

const secretKey = "reactLoginSecretKey";

// generate token
module.exports.generateToken = function (payload) { 
  const token = jwt.sign(payload, secretKey, { expiresIn: '1day' });
  return token;
};

// verify token
module.exports.verifyToken = function (req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, secretKey, function (err, decoded) {
    if (err) {
      console.log("verify error", err);
      return res.json({ code: "404", msg: "token invalid" });
    }
    console.log("verify decoded", decoded);
    next();
  });
};

module.exports.checkToken = function(token, fn) {
  jwt.verify(token, secretKey, function (err, decoded) {
    if (err) {
      console.log("verify error", err);
      fn({ err: "token invalid" });
    } else {
      fn({ err: null, userName: decoded.userName });
    }
  });
}