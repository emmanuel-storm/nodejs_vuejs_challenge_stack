const express = require('express');
const recipes = require("./data/recipes.json");
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
    const recipes = require('./data/recipes.json');
    res.json(recipes);
});

app.get('/api/recipes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const recipes = require('./data/recipes.json');
    const recipe = recipes.find((recipe) => recipe.id === id);

    if (recipe) {
        res.json(recipe);
    } else {
        res.status(404).json({error: "Recipe not found"});
    }
});

app.get('/api/ingredients', (req, res) => {
    const ingredients = require('./data/ingredients.json');
    res.json(ingredients);
});

// Exemple de route pour ajouter des données
app.post('/api/data', (req, res) => {
    const newData = req.body;

    const jsonData = require('./data.json');

    // Ajouter les nouvelles données à votre structure JSON
    jsonData.push(newData);

    // Enregistrer les modifications dans le fichier JSON
    const fs = require('fs');
    fs.writeFileSync('./data.json', JSON.stringify(jsonData));

    res.json(newData);
});

// Écoute du serveur sur le port spécifié
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
