const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../api/secrets');

const secret = jwtSecret;

function authenticate (req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (error, decodedToken) => {
      if (error) {
        res.status(401).json({ you: 'shall not pass!' });
      } else {
        req.decodedToken = decodedToken
        next();
      }
    })
  } else {
      res.status(401).json({message: "Speak friend and enter"})
  }
};

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: '1d'
  };
  return jwt.sign(payload, secret, options)
};

module.exports = { authenticate, generateToken };