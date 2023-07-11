
const routes = [
  {
    path: '/',
    component: () => import('pages/RecipesList.vue'),
  },
  {
    path: "/add-a-recipe",
    component: () => import("pages/RecipesForm.vue"),
  },
  {
    path: '/recipe/:id',
    name: 'recipe-details',
    component: () => import("pages/RecipesDetails.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  },
]

export default routes
