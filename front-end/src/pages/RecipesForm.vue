<template>
  <layout>
    <div style="padding: 2rem">
      <q-card style="padding: 1rem">
        <h1 class="text-h4" style="font-weight: bold; color: #4F268E">Add a recipe</h1>

        <q-form
          @submit="createRecipe"
          @reset="resetForm"
          class="q-gutter-md"
        >
          <q-input
            filled
            v-model="newRecipe.name"
            label="Name of your recipe"
            hint="Name and surname"
            lazy-rules
          />

          <q-input
            filled
            type="textarea"
            v-model="newRecipe.steps"
            label="How to cook it"
            lazy-rules
            aria-multiline="true"
          />

          <div class="add-an-ingredient" style="display: flex; flex-direction: row; gap: 1.5rem">
            <q-select
              filled
              v-model="newRecipe.ingredients"
              multiple
              :options="nameOptions"
              label="Your ingredients"
              style="width: 250px"
            />
            <q-input
              filled
              v-model="newRecipe.ingredients"
              type="number"
              label="Quantity"
            />
          </div>

          <q-btn @click="getSelectedIngredients" label="Get Selected Ingredients" />
          <q-btn @click="addIngredient" label="Add Another Ingredient" />

          <div>
            <q-btn label="Submit" type="submit" style="background-color: #4F268E; color: white"/>
            <q-btn label="Reset" type="reset" style="color: #4F268E" flat class="q-ml-sm" />
          </div>
        </q-form>
      </q-card>
    </div>
    <q-btn color="purple" @click="showNotification" label="Show Notification" />
  </layout>
</template>

<script>
import Layout from "src/layouts/MainLayout.vue";
import {onMounted, ref} from "vue";
import {useIngredientsStore} from "stores/ingredientsStore";
import {useRecipeStore} from "stores/recipesStore";
import { Notify } from 'quasar'

export default {
  name: "RecipeForm",
  components: {
    Layout,
  },

  methods: {
    addIngredient() {
      this.ingredientList.push({ name: null, quantity: null });
    },

    getSelectedIngredients() {
      const selectedIngredients = this.newRecipe.ingredients;
    },

    showNotification() {
      Notify.create({
        message: 'This is a notification',
        color: 'green',
        timeout: 3000,
      })
    },

    resetForm() {
      this.newRecipe = {
        name: "",
        steps: "",
        ingredients: []
      };
    }
  },

  setup() {
    onMounted(async () => {
      const ingredientsStore = useIngredientsStore()
      await ingredientsStore.fetchIngredients();
    });

    const ingredientsStore = useIngredientsStore()
    const recipesStore = useRecipeStore()

    const newRecipe = ref({
      name: "",
      steps: "",
      ingredients: [],
    });

    const nameOptions = []

    ingredientsStore.ingredients.forEach((ingredient) => nameOptions.push(ingredient.name))

    return {
      ingredients: ingredientsStore.ingredients,
      nameOptions,
      newRecipe,
      createRecipe(event) {
        event.preventDefault()
        recipesStore.createRecipe({
          name: newRecipe.value.name,
          steps: newRecipe.value.steps,
          ingredients: newRecipe.value.ingredients,
        })
        newRecipe.value = {
          name: "",
          steps: "",
          ingredients: [],
        }
      },
    };
  },
};
</script>
