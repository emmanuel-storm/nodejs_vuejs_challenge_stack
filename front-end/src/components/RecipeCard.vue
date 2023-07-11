<template>
  <q-card
    class="my-card"
    style="
    width: 25rem;
    color: #4F268E;
    cursor: pointer;
"
    @click="openRecipeDetails"
  >
    <q-card-section class="text-white" style="background-color: #4F268E">
      <div>
        <div class="text-h6">{{ name }}</div>
        <div class="text-subtitle2">Published on: {{ date }} </div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions align="left">
      <q-btn flat>Edit</q-btn>
      <q-btn flat style="background-color: #4F268E; color: white">Delete</q-btn>
    </q-card-actions>
  </q-card>


</template>

<script>

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
      type: Number,
      required: true,
    },
  },

  methods: {
    openRecipeDetails() {
      // Rediriger vers la page de détails de la recette en utilisant l'ID de la recette
      this.$router.push({ name: 'recipe-details', params: { id: this.recipeId } });
    }
  },

  setup() {
  }

}


</script>
