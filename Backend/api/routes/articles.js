const express = require('express');
const router = express.Router();
const sneakerController = require('../../api/controllers/article');

// Route pour récupérer toutes les sneakers
router.get('/articles', sneakerController.getAllArticles);

// Route pour récupérer une sneaker par son ID
router.get('/articles/:id', sneakerController.getArticleById);

module.exports = router;
