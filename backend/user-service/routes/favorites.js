const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favoritesController');

// Per semplicità assumiamo che l'utente autenticato abbia userId fisso = 1
router.get('/', favoritesController.getFavorites);
router.post('/', favoritesController.addFavorite);
router.delete('/:id', favoritesController.deleteFavorite);

module.exports = router;
