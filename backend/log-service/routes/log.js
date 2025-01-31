const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');

// Endpoint per aggiungere, visualizzare e cancellare i log
router.get('/', logController.getLogs);
router.post('/', logController.addLog);
router.delete('/', logController.clearLogs);

module.exports = router;