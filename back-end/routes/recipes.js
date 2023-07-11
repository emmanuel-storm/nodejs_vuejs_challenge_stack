const express = require('express')

const router = express.Router()

const recipesController = require('../controller/recipes')

router.get('/', recipesController.getAllRecipes)

router.get('/:id', recipesController.getRecipe)

router.post('/', recipesController.createRecipe)

router.put('/:id', recipesController.updateRecipe)

module.exports = router;