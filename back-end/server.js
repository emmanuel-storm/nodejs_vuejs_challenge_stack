const express = require('express');
const recipes = require("./data/recipes.json");
const ingredients = require('./data/ingredients.json');
const {v4: uuidv4} = require('uuid');
const fs = require("fs");

const app = express();
const port = 3000; // Le port sur lequel votre serveur écoutera les requêtes

// Middleware pour pouvoir lire les données JSON dans les requêtes
app.use(express.json());

// Définition des routes

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.get('/api/recipes', (req, res) => {
    // Lire les données depuis le fichier JSON
    res.json(recipes);
});

app.get('/api/recipes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const recipe = recipes.find((recipe) => recipe.id === id);

    if (recipe) {
        res.json(recipe);
    } else {
        res.status(404).json({error: "Recipe not found"});
    }
});

app.post('/api/recipes', (req, res) => {
    const newRecipe = req.body;
    newRecipe.id = uuidv4();

    // Ajouter les nouvelles données à votre structure JSON
    recipes.push(newRecipe);

    // Enregistrer les modifications dans le fichier JSON
    const fs = require('fs');
    fs.writeFileSync('./data/recipes.json', JSON.stringify(recipes));

    res.status(201).json(newRecipe);
});

app.put('/api/recipes/:id', (req, res) => {
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
});


app.get('/api/ingredients', (req, res) => {
    res.json(ingredients);
});

app.get('/api/ingredients/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const ingredient = ingredients.find((ingredient) => ingredient.id === id);

    if (ingredient) {
        res.json(ingredient);
    } else {
        res.status(404).json({error: "Ingredient not found"});
    }
});


// Écoute du serveur sur le port spécifié
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
