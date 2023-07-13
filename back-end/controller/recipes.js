const recipes = require("../data/recipes.json");
const ingredients = require("../data/ingredients.json");

const {v4: uuidv4} = require("uuid");
const fs = require("fs");

// Récupère toutes les recettes
exports.getAllRecipes = (req, res) => {
    res.status(200).json(recipes);
}

// Récupère une recette spécifique par son ID
exports.getRecipe = (req, res) => {
    const id = req.params.id;
    const recipe = recipes.find((recipe) => recipe.id === id);

    if (recipe) {
        try {
            let recipe_data = recipe;
            for (let i = 0; i < recipe.ingredients.length; i++) {
                let id_ingredient = recipe.ingredients[i].id;
                let ingredient = ingredients.find((ingredient) => ingredient.id === id_ingredient);
                if (ingredient) {
                    recipe_data.ingredients[i].name = ingredient.name;
                } else {
                    res.status(500).json({error: "Ingredient not found"});
                }
            }
            res.status(200).json(recipe_data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(404).json({error: "Recipe not found"});
    }
}

// Effectue une analyse nutritionnelle d'une recette spécifique
exports.getRecipeAnalyse = (req, res) => {
    const id = req.params.id;
    const recipe = recipes.find((recipe) => recipe.id === id);

    if (recipe) {
        try {
            let result = 0;

            for (let i = 0; i < recipe.ingredients.length; i++) {
                let id_ingredient = recipe.ingredients[i].id
                let quantity = recipe.ingredients[i].quantity
                let caloriesPer100Units = ingredients.find((ingredient) => ingredient.id === id_ingredient).caloriesPer100Units
                if (caloriesPer100Units) {
                    result += (quantity * (caloriesPer100Units / 100));
                } else {
                    res.status(500).json({error: "Calories per 100 units not found for an ingredient"});
                }
            }

            res.status(200).json(Math.round(result));
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(404).json({error: "Recipe not found"});
    }
}

// Crée une nouvelle recette
exports.createRecipe = (req, res) => {
    try {
        const newRecipe = req.body;
        newRecipe.id = uuidv4();

        // Ajouter les nouvelles données à votre structure JSON
        recipes.push(newRecipe);

        // Enregistrer les modifications dans le fichier JSON
        fs.writeFileSync('./data/recipes.json', JSON.stringify(recipes));

        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Met à jour une recette existante
exports.updateRecipe = (req, res) => {
    const id = req.params.id;
    const updatedRecipe = req.body;
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id);

    if (recipeIndex !== -1) {
        try {
            recipes[recipeIndex] = {...recipes[recipeIndex], ...updatedRecipe};

            // Écriture des modifications dans le fichier recipes.json
            fs.writeFile('./data/recipes.json', JSON.stringify(recipes), (err) => {
                if (err) {
                    throw new Error("Error writing to file");
                } else {
                    res.status(200).json(recipes[recipeIndex]);
                }
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(404).json({error: 'Recipe not found'});
    }
}

// Supprime une recette existante
exports.deleteRecipe = (req, res) => {
    const id = req.params.id;
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id);

    if (recipeIndex !== -1) {
        try {
            recipes.splice(recipeIndex, 1);

            fs.writeFile('./data/recipes.json', JSON.stringify(recipes), (err) => {
                if (err) {
                    throw new Error(`Error writing to file : ${err.message}`);
                } else {
                    res.status(200).json({ success: true });
                }
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(404).json({error: 'Recipe not found'});
    }
}
