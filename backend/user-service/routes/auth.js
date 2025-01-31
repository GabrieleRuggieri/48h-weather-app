const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Endpoint per la registrazione e il login
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
