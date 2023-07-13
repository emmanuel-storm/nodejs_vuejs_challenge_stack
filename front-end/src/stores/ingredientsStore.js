import { defineStore } from 'pinia'
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';


export const useIngredientsStore = defineStore('ingredients', {
  state: () => ({
    ingredients: [],
  }),

  actions: {
    async fetchIngredients(){
      try {
        const res = await axios.get(`${API_BASE_URL}/ingredients`)
        this.ingredients = res.data
      }
      catch (err) {
        console.error("Error during the get of ingredients :", err)
      }
    },

    async fetchOneIngredient(ingredientId){
      try {
        const res = await axios.get(`${API_BASE_URL}/ingredients/${ingredientId}`)
        this.ingredients = res.data
      }
      catch (err) {
        console.error("Error during the get of an ingredient :", err)
      }
    },
  }
})

