<template>
  <q-card
    class="my-card"
    style="
    width: 25rem;
    color: #4F268E;
    cursor: pointer;
"
  >
    <q-card-section class="text-white" style="background-color: #4F268E" @click="openRecipeDetails(recipeId)">
      <div>
        <div class="text-h6">{{ name }}</div>
        <div class="text-subtitle2">Published on: {{ date }} </div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions align="left">
      <q-btn flat @click="console.log('bonjour')">Edit</q-btn>
      <q-btn outline style="color: red">Delete</q-btn>
    </q-card-actions>
  </q-card>


</template>

<script>

import {useRecipeStore} from "stores/recipesStore";
import {useRouter} from "vue-router";
import router from "src/router";

export default {
  name: "RecipeCard",

  props: {
    name: {
      type: String,
      required: true,
    },
    steps: {
      type: String,
    },
    date: {
      type: String,
      required: true,
    },
    recipeId: {
      type: String,
      required: true,
    },
  },

  setup() {
    const router = useRouter();
    function openRecipeDetails(id) {
      const store = useRecipeStore();
      console.log({ id });
      store
        .fetchOneRecipe(id)
        .then(() => {
          // Utilisez la méthode push de l'instance de Vue Router
          router.push(`/recipe/${id}`);
        })
        .catch((error) => {
          console.error("Error fetching recipe:", error);
        });
    }

    return {
      openRecipeDetails,
    }

  },
  mixins: [router],
}


</script>
