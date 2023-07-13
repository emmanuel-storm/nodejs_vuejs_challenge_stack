import { defineStore } from 'pinia'
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';


export const useRecipeStore = defineStore('recipes', {
  state: () => ({
    recipes: [],
  }),

  actions: {
    async fetchRecipes(){
      try {
        const res = await axios.get(`${API_BASE_URL}/recipes`)
        this.recipes = res.data
      }
      catch (err) {
        console.error("Error during the get of the data :", err)
      }
    },

    async fetchOneRecipe(recipeId){
      try {
        const res = await axios.get(`${API_BASE_URL}/recipes/${recipeId}`)
        this.recipes = res.data
      }
      catch (err) {
        console.log("Error detected during the get of this recipe :", err)
      }
    },

    async createRecipe(newRecipe) {
      try {
        const res = await axios.post(`${API_BASE_URL}/recipes`, newRecipe)
        this.recipes.push(res.data)
      }
      catch (err) {
        console.error("Error during the creation of the recipe :", err)
      }
    },

    async updateRecipe(updatedRecipe) {
      try {
        const response = await axios.put(`${API_BASE_URL}/recipes/${updatedRecipe.id}`, updatedRecipe);
        const index = this.recipes.findIndex((recipe) => recipe.id === updatedRecipe.id);
        if (index !== -1) {
          this.recipes.splice(index, 1, response.data);
        }
      } catch (error) {
        console.error('Error when trying to update recipe :', error);
      }
    },

    async deleteRecipe(recipeId) {
      try {
        await axios.delete(`${API_BASE_URL}/recipes/${recipeId}`);
        const index = this.recipes.findIndex((recipe) => recipe.id === recipeId);
        if (index !== -1) {
          this.recipes.splice(index, 1);
        }
      } catch (error) {
        console.error('Error when trying to delete the recipe :', error);
      }
    },
  }
})

