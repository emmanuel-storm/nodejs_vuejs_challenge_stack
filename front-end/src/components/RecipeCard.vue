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
        <div style="display: none">{{ steps }}</div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions align="left">
      <q-btn flat @click="editRecipe">Edit</q-btn>
      <q-btn outline style="color: red" @click="deleteRecipe(recipeId)">Delete</q-btn>
    </q-card-actions>
  </q-card>

  <div class="update-dialog">
    <q-dialog
      v-model="dialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <q-bar>
          <q-space />

          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <div style="padding: 2rem">
          <q-form
            @submit="submitUpdate"
            @reset="onReset"
            class="q-gutter-md"
          >
            <q-input
              filled
              v-model="updateRecipeRef.name"
              label="update the name"
              hint="Name and surname"
              lazy-rules
              :value="editingRecipe ? editingRecipe.name : ''"
            />

            <q-input
              filled
              type="textarea"
              v-model="updateRecipeRef.steps"
              label="Update instruction"
              lazy-rules
              :value="editingRecipe ? editingRecipe.steps : ''"
            />

            <div class="add-an-ingredient" style="display: flex; flex-direction: row; gap: 1.5rem">
              <q-select
                filled
                v-model="updateRecipeRef.ingredients"
                multiple
                :options="[]"
                label="Your ingredients"
                style="width: 25rem"
              />
              <q-input
                filled
                v-model="updateRecipe.quantity"
                type="number"
                label="Quantity"
              />
            </div>

            <div>
              <q-btn label="Submit" type="submit" style="background-color: #4F268E; color: white"/>
              <q-btn label="Reset" type="reset" style="color: #4F268E;" flat class="q-ml-sm" />
            </div>
          </q-form>
        </div>

      </q-card>
    </q-dialog>
  </div>


</template>

<script>

import {useRecipeStore} from "stores/recipesStore";
import {useRouter} from "vue-router";
import router from "src/router";
import {ref} from "vue";

export default {
  name: "RecipeCard",

  props: {
    name: {
      type: String,
      required: true,
    },
    steps: {
      type: String,
      required: true,
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

  setup(props) {
    const router = useRouter();

    const store = useRecipeStore()
    const editingRecipe = ref(null);
    const dialog = ref(false);
    const maximizedToggle = ref(false);

    const updateRecipeRef = ref({
      id: props.recipeId,
      name: props.name,
      steps: props.steps,
      ingredients: [],
    });

    function submitUpdate() {
      store.updateRecipe({
        id: props.recipeId,
        name: updateRecipeRef.value.name,
        steps: updateRecipeRef.value.steps,
        ingredients: updateRecipeRef.value.ingredients,
      });

      updateRecipeRef.value = {
        id: props.recipeId,
        name: props.name,
        steps: props.steps,
        ingredients: [],
      };

      dialog.value = false;
    }

    function editRecipe() {
      editingRecipe.value = {
        name: props.name,
        steps: props.steps,
        ingredients: [], // Ajoutez ici les autres propriétés de la recette si nécessaire
      };
      dialog.value = true;
    }

    function openRecipeDetails(id) {
      const store = useRecipeStore();
      const recipe = store.recipes.find((r) => r.id === id);
      editingRecipe.value = { ...recipe };

      store
        .fetchOneRecipe(id)
        .then(() => {
          router.push(`/recipe/${id}`);
        })
        .catch((error) => {
          console.error("Error fetching recipe:", error);
        });
    }

    console.log({editingRecipe})

    return {
      editRecipe,
      editingRecipe,
      openRecipeDetails,
      submitUpdate,
      deleteRecipe(recipeId) {
        store.deleteRecipe(recipeId)
      },

      updateRecipeRef,

      updateRecipe(updateRecipe) {
        this.dialog = true;
        store.updateRecipe({
          id: this.recipeId,
          name: updateRecipe.name,
          steps: updateRecipe.steps,
          ingredients: updateRecipe.ingredients,
        });
      },

      dialog,
      maximizedToggle
    }

  },
  mixins: [router],
}


</script>
