const ingredients = require("../data/ingredients.json");

// Récupère tous les ingrédients
exports.getAllIngredients = (req, res) => {
    res.status(200).json(ingredients);
}

// Récupère un ingrédient spécifique par son ID
exports.getIngredient = (req, res) => {
    const id = req.params.id;
    const ingredient = ingredients.find((ingredient) => ingredient.id === id);

    if (ingredient) {
        res.status(200).json(ingredient);
    } else {
        res.status(404).json({error: "Ingredient not found"});
    }
}
