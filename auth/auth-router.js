const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { generateToken } = require('./authenticate-middleware');
const { rounds } = require('../api/secrets');
const Users = require('./auth-models');

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, rounds);

  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json({
        message: 'Cannot add user', error
      });
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token: token
        });
      } else {
        res.status(401).json({
          message: 'You shall not pass! (login please)'
        });
      }
    })
    .catch(error => {
      res.status(500).json({ errorMessage: error.message });
    });
});

module.exports = router;
