const jwt = require('jsonwebtoken');

function authMiddleWare(req, res, next) {
  
  
  const token = req.headers.token
  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
    const decoded = jwt.verify(token, '2000');
    req.userId = decoded.userId;
    
    next();
  } catch (error) {
    console.log({error})
    res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = {authMiddleWare};
