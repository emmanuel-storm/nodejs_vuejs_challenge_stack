const express = require('express');
const cors = require('cors'); // Importez le module cors

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:9000'
}));

const recipesRoutes = require('./routes/recipes')
const ingredientsRoutes = require('./routes/ingredients')

app.use('/api/recipes', recipesRoutes)
app.use('/api/ingredients', ingredientsRoutes)

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
