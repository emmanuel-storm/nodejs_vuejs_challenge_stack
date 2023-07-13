<template>
  <main-layout>
    <div style="padding: 2rem; max-height: 100vh; overflow-x: scroll">
      <q-card style="padding: 1rem">
        <q-card class="my-card" style="display: flex; flex-direction: column; gap: 2rem">
          <q-img src="https://assets.afcdn.com/recipe/20211214/125831_w1024h768c1cx866cy866.jpg" height="60em">
            <div class="text-h5 absolute-bottom">
              {{ name }}
            </div>
          </q-img>
          <q-card-section class="q-pt-none">
            <p style="font-size: 1rem">
              {{ steps }}
            </p>
          </q-card-section>
        </q-card>
      </q-card>
    </div>
  </main-layout>
</template>

<script>

import MainLayout from "layouts/MainLayout.vue";
import {useRecipeStore} from "stores/recipesStore";
import {onMounted} from "vue";
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
    onMounted(async () => {
      const recipesStore = useRecipeStore()
      await recipesStore.fetchRecipes();
    });

    const recipesStore = useRecipeStore();

    console.log(recipesStore.recipes)

    return {
      name: recipesStore.recipes.name,
      steps: recipesStore.recipes.steps,
    };
  },
};
</script>
