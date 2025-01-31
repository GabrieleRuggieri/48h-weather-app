const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

// Endpoint per ottenere i dati meteo in base alla città
router.get('/', weatherController.getWeather);

module.exports = router;
