const jwt = require('jsonwebtoken');

// Access Token
const generateAccessToken = user => {
  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
  );
};

// Refresh Token
const generateRefreshToken = user => {
  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRE }
  );
};

module.exports = { generateAccessToken, generateRefreshToken };
