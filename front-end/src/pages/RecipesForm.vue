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

          <q-select
            filled
            v-model="ingredients"
            multiple
            :options="[
      'Chicken', 'Tomato', 'Oil', 'Onion', 'Fish'
    ]"
            label="Your ingredients"
            style="width: 250px"
          />

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

export default {
  name: "RecipeForm",
  components: {
    Layout,
  },

  methods: {
    submitForm() {
      // Soumettre le formulaire et traiter les données ici
      console.log(this.form.name);
    }
  },

  data() {
    const options = [
      'Chicken', 'Tomato', 'Oil', 'Onion', 'Fish'
    ]

    return {
      form: {
        name: '',
        steps: '',
        options,
      }
    };
  },
};
</script>
