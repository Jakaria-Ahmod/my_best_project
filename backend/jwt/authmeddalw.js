const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // 1️⃣ Get token from headers
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // 3️⃣ Attach user info to request
    req.user = decoded; // { id, username, iat, exp }

    next(); // pass control to next middleware or route
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
