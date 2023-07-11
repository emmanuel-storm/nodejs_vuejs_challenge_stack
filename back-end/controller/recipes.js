const recipes = require("../data/recipes.json");
const {v4: uuidv4} = require("uuid");
const fs = require("fs");

exports.getAllRecipes = (req, res) => {
    res.status(200).json(recipes);
}

exports.getRecipe = (req, res) => {
    const id = req.params.id;
    const recipe = recipes.find((recipe) => recipe.id === id);

    if (recipe) {
        res.status(200).json(recipe);
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