const jwt = require("jsonwebtoken");

module.exports.jwtAuth = async (req, res, next) => {
  // Read the Token
    const token = await req.headers["authorization"];
    if (!token) {
      return res.send({ error: "UnAuthorized in not token" });
    }
    //check if token is valid
    try {
    const payload = jwt.verify(token, "SDIPGAPOUDUPIUNNA04356");
    req.userId = payload.userId;
    
  } catch (err) {
    console.log(err);
    return res.send("UnAuthorized in Catch");
  }
  next();
};
