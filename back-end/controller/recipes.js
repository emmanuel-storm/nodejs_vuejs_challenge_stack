const recipes = require("../data/recipes.json");
const ingredients = require("../data/ingredients.json");

const {v4: uuidv4} = require("uuid");
const fs = require("fs");

exports.getAllRecipes = (req, res) => {
    res.status(200).json(recipes);
}

exports.getRecipe = (req, res) => {
    const id = req.params.id;
    const recipe = recipes.find((recipe) => recipe.id === id);

    if (recipe) {
        for (i = 0; i < recipe.ingredients.length; i++) {
            let id_ingredient = recipe.ingredients[i].id
            recipe.ingredients[i].name = ingredients.find((ingredient) => ingredient.id === id_ingredient).name;
        }
            res.status(200).json(recipe);
    } else {
        res.status(404).json({error: "Recipe not found"});
    }
}

exports.getRecipeAnalyse = (req, res) => {
    const id = req.params.id;
    const recipe = recipes.find((recipe) => recipe.id === id);

    if (recipe) {
        let result = 0;

        for (i = 0; i < recipe.ingredients.length; i++) {
            let id_ingredient = recipe.ingredients[i].id
            let quantity = recipe.ingredients[i].quantity
            let caloriesPer100Units = ingredients.find((ingredient) => ingredient.id === id_ingredient).caloriesPer100Units
            result += (quantity * (caloriesPer100Units / 100))
        }

        res.status(200).json(Math.round(result));
    } else {
        res.status(404).json({error: "Recipe not found"});
    }
}

exports.createRecipe = (req, res) => {
    const newRecipe = req.body;
    newRecipe.id = uuidv4();

    // Ajouter les nouvelles données à votre structure JSON
    recipes.push(newRecipe);

    // Enregistrer les modifications dans le fichier JSON
    const fs = require('fs');
    fs.writeFileSync('./data/recipes.json', JSON.stringify(recipes));

    res.status(201).json(newRecipe);
}

exports.updateRecipe = (req, res) => {
    const id = req.params.id;
    const updatedRecipe = req.body;
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id);


    console.log(recipeIndex)
    if (recipeIndex !== -1) {
        recipes[recipeIndex] = {...recipes[recipeIndex], ...updatedRecipe};

        // Écriture des modifications dans le fichier recipes.json
        fs.writeFile('./data/recipes.json', JSON.stringify(recipes), (err) => {
            if (err) {
                res.status(500).json({error: 'Error writing to file'});
            } else {
                res.status(200).json(recipes[recipeIndex]);
            }
        });
    } else {
        res.status(404).json({error: 'Recipe not found'});
    }
}

exports.deleteRecipe = (req, res) => {
    const id = req.params.id;
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id);

    if (recipeIndex !== -1) {
        recipes.splice(recipeIndex, 1);

        fs.writeFile('./data/recipes.json', JSON.stringify(recipes), (err) => {
            if (err) {
                res.status(500).json({error: 'Error writing to file'});
            } else {
                res.status(200).json({ success: true });
            }
        });
    } else {
        res.status(404).json({error: 'Recipe not found'});
    }
}