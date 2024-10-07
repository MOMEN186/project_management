const jwt = require('jsonwebtoken');

function authMiddleWare(req, res, next) {
  console.clear();
  console.log("in auth middleware");
  const token=req.headers.token
  console.log({token})
  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
    const decoded = jwt.verify(token, '2000');
    console.log(decoded.userId);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = {authMiddleWare};
