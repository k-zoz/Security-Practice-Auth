const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { Unauthenticated } = require("../errors");

const auhtnticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Unauthenticated("Invalid Credentials");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userID: payload.userID, name: payload.name };
    next();
  } catch (error) {
    throw new Unauthenticated("Invalid Credentials");
  }
};

module.exports = auhtnticate;
