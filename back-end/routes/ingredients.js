const express = require('express')

const router = express.Router()

const ingredientsController = require('../controller/ingredients')

router.get('/', ingredientsController.getAllIngredients)

router.get('/:id', ingredientsController.getIngredient)

module.exports = router;