const express = require('express');

const app = express();
const port = 3000; // Le port sur lequel votre serveur écoutera les requêtes

// Middleware pour pouvoir lire les données JSON dans les requêtes
app.use(express.json());

const recipesRoutes = require('./routes/recipes')
const ingredientsRoutes = require('./routes/ingredients')

app.use('/api/recipes', recipesRoutes)
app.use('/api/ingredients', ingredientsRoutes)


// Écoute du serveur sur le port spécifié
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
