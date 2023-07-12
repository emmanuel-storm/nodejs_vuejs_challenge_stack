<template>
  <layout>
    <div style="padding: 2rem">
      <q-card style="padding: 1rem">
        <h1 class="text-h4" style="font-weight: bold; color: #4F268E">Add a recipe</h1>

        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >
          <q-input
            filled
            v-model="name"
            label="Name of your recipe"
            hint="Name and surname"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <q-input
            filled
            type="textarea"
            v-model="steps"
            label="How to cook it"
            lazy-rules
            aria-multiline="true"
            :rules="[
          val => val !== null && val !== '' || 'Please describe your food',
        ]"
          />

          <div class="add-an-ingredient" style="display: flex; flex-direction: row; gap: 1.5rem">
            <q-select
              filled
              v-model="test"
              multiple
              :options="nameOptions"
              label="Your ingredients"
              style="width: 250px"
              hide-selected
            />
            <q-input
              filled
              v-model="quantity"
              type="number"
              label="Quantity"
            ></q-input>
          </div>

          <q-btn @click="addIngredient" label="Add Another Ingredient" />

          <div>
            <q-btn label="Submit" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </q-card>
    </div>
  </layout>
</template>

<script>
import Layout from "src/layouts/MainLayout.vue";
import {onMounted, ref} from "vue";
import {useIngredientsStore} from "stores/ingredientsStore";

export default {
  name: "RecipeForm",
  components: {
    Layout,
  },

  methods: {
    addIngredient() {
      this.ingredientList.push({ name: null, quantity: null });
    },

    submitForm() {
      // Soumettre le formulaire et traiter les données ici

    }
  },

  setup() {
    onMounted(async () => {
      const ingredientsStore = useIngredientsStore()
      await ingredientsStore.fetchIngredients();
    });

    const newRecipe = ref({
      name: "",
      steps: "",
      ingredients: [],
    });

    const ingredientsStore = useIngredientsStore()

    const nameOptions = []

    ingredientsStore.ingredients.forEach((ingredient) => nameOptions.push(ingredient.name))

    console.log(nameOptions)

    return {
      ingredients: ingredientsStore.ingredients,
      nameOptions,
      form: {
        name: '',
        steps: '',
        nameOptions,
      }
    };
  },
};
</script>
