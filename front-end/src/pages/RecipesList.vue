<template>
  <layout>
    <div style="padding: 2rem">
      <q-card style="padding: 1rem">
        <h1 class="text-h4" style="font-weight: bold; color: #4F268E">List of recipes</h1>
        <div style="display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-flow: row;
  grid-gap: 1rem;
">
          <div v-for="recipe in recipesList" :key="recipe.id">
            <RecipeCard :name="recipe.name" :date="recipe.date" :recipeId="recipe.id"/>
          </div>
        </div>
      </q-card>
    </div>
  </layout>
</template>

<script>
import Layout from "src/layouts/MainLayout.vue";
import RecipeCard from "components/RecipeCard.vue";

export default {
  name: "RecipeList",
  components: {
    Layout,
    RecipeCard,
  },

  setup() {
    const recipesList = [
      {
        id: 1,
        name: "Pizza margherita",
        date: "2022-05-12",
        steps: [
          "Préchauffez le four à 220°C.",
          "Étalez la pâte à pizza sur une plaque.",
          "Étalez les tomates et la mozzarella sur la pâte.",
          "Ajoutez des feuilles de basilic.",
          "Enfournez pendant 15 minutes.",
          "Servez chaud."
        ]
      },
      {
        id: 2,
        name: "Poulet rôti",
        date: "2022-06-03",
        steps: [
          "Préchauffez le four à 180°C.",
          "Placez le poulet dans un plat.",
          "Farcissez-le avec des quartiers de citron et de l'ail.",
          "Saupoudrez d'herbes de Provence.",
          "Enfournez pendant 1h30.",
          "Laissez reposer avant de servir."
        ]
      },
      {
        id: 3,
        name: "Salade César",
        date: "2022-07-18",
        steps: [
          "Lavez et déchirez la laitue romaine.",
          "Ajoutez des morceaux de poulet grillé.",
          "Ajoutez des croûtons et du parmesan râpé.",
          "Assaisonnez avec de la sauce César.",
          "Mélangez bien avant de servir."
        ]
      },
      {
        id: 1,
        name: "Pizza margherita",
        date: "2022-05-12",
        steps: [
          "Préchauffez le four à 220°C.",
          "Étalez la pâte à pizza sur une plaque.",
          "Étalez les tomates et la mozzarella sur la pâte.",
          "Ajoutez des feuilles de basilic.",
          "Enfournez pendant 15 minutes.",
          "Servez chaud."
        ]
      },
      {
        id: 2,
        name: "Poulet rôti",
        date: "2022-06-03",
        steps: [
          "Préchauffez le four à 180°C.",
          "Placez le poulet dans un plat.",
          "Farcissez-le avec des quartiers de citron et de l'ail.",
          "Saupoudrez d'herbes de Provence.",
          "Enfournez pendant 1h30.",
          "Laissez reposer avant de servir."
        ]
      },
      {
        id: 3,
        name: "Salade César",
        date: "2022-07-18",
        steps: [
          "Lavez et déchirez la laitue romaine.",
          "Ajoutez des morceaux de poulet grillé.",
          "Ajoutez des croûtons et du parmesan râpé.",
          "Assaisonnez avec de la sauce César.",
          "Mélangez bien avant de servir."
        ]
      },
      {
        id: 4,
        name: "Spaghetti bolognaise",
        date: "2022-08-05",
        steps: [
          "Faites cuire les spaghetti selon les instructions sur l'emballage.",
          "Dans une poêle, faites revenir l'oignon et l'ail dans de l'huile d'olive.",
          "Ajoutez la viande hachée et faites-la brunir.",
          "Ajoutez la sauce tomate, les herbes et laissez mijoter.",
          "Égouttez les spaghetti et mélangez-les avec la sauce.",
          "Servez chaud avec du parmesan râpé."
        ]
      },
      {
        id: 5,
        name: "Tarte aux pommes",
        date: "2022-09-21",
        steps: [
          "Préchauffez le four à 180°C.",
          "Étalez la pâte brisée dans un moule à tarte.",
          "Pelez et coupez les pommes en tranches.",
          "Disposez les tranches de pommes sur la pâte.",
          "Saupoudrez de sucre et de cannelle.",
          "Enfournez pendant 30 minutes jusqu'à ce que la tarte soit dorée."
        ]
      },
      {
        id: 6,
        name: "Gâteau au chocolat",
        date: "2022-10-14",
        steps: [
          "Préchauffez le four à 180°C.",
          "Faites fondre le chocolat et le beurre au bain-marie.",
          "Dans un bol, battez les œufs et le sucre jusqu'à obtenir un mélange mousseux.",
          "Ajoutez le mélange de chocolat fondu et mélangez bien.",
          "Incorporez la farine et la levure.",
          "Versez la pâte dans un moule beurré et fariné.",
          "Enfournez pendant 25-30 minutes.",
          "Laissez refroidir avant de démouler et de servir."
        ]
      },
    ];

    return {
      recipesList,
    }
  }
};

</script>
