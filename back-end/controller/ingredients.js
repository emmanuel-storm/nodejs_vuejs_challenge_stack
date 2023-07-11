const ingredients = require("../data/ingredients.json");

exports.getAllIngredients = (req, res) => {
    res.status(200).json(ingredients);
}

exports.getIngredient = (req, res) => {
    const id = req.params.id;
    const ingredient = ingredients.find((ingredient) => ingredient.id === id);

    if (ingredient) {
        res.status(200).json(ingredient);
    } else {
        res.status(404).json({error: "Ingredient not found"});
    }
}
