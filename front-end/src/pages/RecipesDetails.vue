<template>
  <main-layout>
    <div style="padding: 2rem; max-height: 100vh; overflow-x: scroll">
      <q-card style="padding: 1rem">
        <q-card class="my-card" style="display: flex; flex-direction: column; gap: 2rem">
          <q-img src="https://assets.afcdn.com/recipe/20211214/125831_w1024h768c1cx866cy866.jpg" height="60em">
            <div class="text-h5 absolute-bottom">
              {{ recipe?.name }}
            </div>
          </q-img>
          <q-card-section class="q-pt-none">
            <div class="text-h5" style="font-weight: bold">
              <p>Ingredients</p>
            </div>

            <div v-for="ingredient in ingredientsList" :key="ingredient.id">
              <q-chip color="purple" text-color="white" style="margin-bottom: 2rem">
                {{ ingredient.name }}
              </q-chip>

              <q-chip color="grey" text-color="white" style="margin-bottom: 2rem">
                {{ ingredient.quantity }} g
              </q-chip>
            </div>


            <div class="text-h5" style="font-weight: bold">
              <p>How to cook it ?</p>
            </div>
            <p style="font-size: 1rem">
              {{ recipe?.steps }}
            </p>

            <div class="text-h5" style="font-weight: bold">
              <p>Total des calories</p>
            </div>

            <q-chip color="purple" text-color="white" style="margin-bottom: 2rem">
              {{ calorie }} cal
            </q-chip>
          </q-card-section>
        </q-card>
      </q-card>
    </div>
  </main-layout>
</template>

<script>

import MainLayout from "layouts/MainLayout.vue";
import {useRecipeStore} from "stores/recipesStore";
import {computed, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {useCalorieStore} from "stores/caloriesStore";

export default {
  name: 'RecipeDetails',
  components: {MainLayout},
  props: {
    id: {
      type: String,
      required: true,
    },
  },

  setup() {
    const route = useRoute()
    const recipe = ref(null);
    const ingredientsList = ref([])

    onMounted(async () => {
      const recipesStore = useRecipeStore()
      const routeId = computed(() => route.params.id);
      const calorieStore = useCalorieStore()

      await recipesStore.fetchRecipes();
      await recipesStore.fetchOneRecipe(routeId.value);
      await calorieStore.fetchCaloriesOfRecipe(routeId.value)

      console.log(calorieStore.calorie)

      recipe.value = recipesStore.recipes.find((r) => r.id === routeId.value);

      ingredientsList.value = recipe.value?.ingredients || []

      if (recipe.value && recipe.value.ingredients) {
        ingredientsList.value = recipe.value.ingredients;
      } else {
        console.log('No ingredients found');
      }
    });

    const recipesStore = useRecipeStore()
    const caloriesStore = useCalorieStore()

    return {
      recipe,
      ingredients: recipesStore.recipes.ingredients,
      ingredientsList,
      calorie: caloriesStore.calorie,
    };
  },
};
</script>
