const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { generateToken } = require('../middleware/middleware');
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
      res.status(500).json({ message: 'Cannot add user', error });
    });
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
