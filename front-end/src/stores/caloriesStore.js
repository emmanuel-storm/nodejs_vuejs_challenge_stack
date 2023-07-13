import { defineStore } from 'pinia'
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';


export const useCalorieStore = defineStore('calorie', {
  state: () => ({
    calorie: 0,
  }),

  actions: {
    async fetchCaloriesOfRecipe(recipeId) {
      try {
        const response = await axios.get(`${API_BASE_URL}/recipes/${recipeId}/analyse`);
        this.calorie = response.data
      } catch (error) {
        console.log("Error detected during the get of the calcul:", error);
      }
    },
  }
})

