<template>
  <router-view />
</template>

<script>
import {defineComponent, onMounted} from 'vue'
import {useRecipeStore} from "stores/recipesStore";
import {useIngredientsStore} from "stores/ingredientsStore";

export default defineComponent({
  name: 'App',

  setup() {
    onMounted(async () => {
      const recipeStore = useRecipeStore()
      const ingredientsStore = useIngredientsStore()

      await recipeStore.fetchRecipes();
      await ingredientsStore.fetchIngredients();
    });
  }
})
</script>
