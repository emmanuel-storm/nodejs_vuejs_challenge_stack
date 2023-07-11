const express = require('express');
const recipes = require("./data/recipes.json");
const ingredients = require('./data/ingredients.json');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000; // Le port sur lequel votre serveur écoutera les requêtes

// Middleware pour pouvoir lire les données JSON dans les requêtes
app.use(express.json());

// Définition des routes

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Exemple de route pour récupérer toutes les données

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

// Exemple de route pour ajouter des données
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

// Écoute du serveur sur le port spécifié
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
