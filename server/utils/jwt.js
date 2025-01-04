const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    {
      user_id : user.user_id,
      customer_id : user.customer_id,
      email: user.email,
      username: user.username,
    },
    process.env.SECRET
  );
};

const authentication = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(400).json({ error: 'Authorization header is missing or invalid.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET);

    if (!decoded.customer_id) {
      return res.status(400).json({ error: 'Token does not contain customer_id.' });
    }

    req.user = decoded; 
    next();
  } catch (error) {
    console.error("Authentication Error:", error);
    res.status(403).json({ error: 'Unauthorized access.' });
  }
};

module.exports = { generateToken, authentication };