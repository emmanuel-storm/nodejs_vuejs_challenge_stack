<template>
  <layout>
    <div style="padding: 2rem; max-height: 100vh; overflow-y: scroll">
      <q-card style="padding: 1rem">
        <h1 class="text-h4" style="font-weight: bold; color: #4F268E">List of recipes</h1>
        <div style="display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-flow: row;
  grid-gap: 1rem;
">
          <div v-for="recipe in recipes" :key="recipe.id">
            <RecipeCard
              :name="recipe.name"
              date="29 Juil. 2023"
              :recipeId="recipe.id"
              :steps="recipe.steps"
            />
          </div>
        </div>
      </q-card>
    </div>
  </layout>
</template>

<script>
import Layout from "src/layouts/MainLayout.vue";
import RecipeCard from "components/RecipeCard.vue";
import {useRecipeStore} from "stores/recipesStore";

export default {
  name: "RecipeList",
  components: {
    Layout,
    RecipeCard,
  },

  setup() {
    const store = useRecipeStore()

    return {
      recipes: store.recipes,
    }
  }
};

</script>
