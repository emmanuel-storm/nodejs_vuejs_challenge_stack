<template>
  <main-layout>
    <div class="text-h4"></div>
    <div style="padding: 2rem">
      <q-card style="padding: 1rem">
        <q-card class="my-card" style="display: flex; flex-direction: column; gap: 2rem">
          <q-img src="https://assets.afcdn.com/recipe/20211214/125831_w1024h768c1cx866cy866.jpg" height="60em">
            <div class="text-h5 absolute-bottom">
              Ceci est le nom d'une recette
            </div>
          </q-img>
          <q-card-section class="q-pt-none">
            <p style="font-size: 1rem">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </q-card-section>
        </q-card>
      </q-card>
    </div>
  </main-layout>
</template>

<script>

import Layout from "src/layouts/MainLayout.vue";
import MainLayout from "layouts/MainLayout.vue";
export default {
  name: 'RecipeDetails',
  components: {MainLayout},
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  created() {
    // Récupérer les données de la recette en utilisant l'ID
    // Exemple : appeler une méthode ou une API pour récupérer les détails de la recette
  },

  setup() {

  }
};
</script>
