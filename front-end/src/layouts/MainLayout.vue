<template>
  <div class="layout">
    <div class="navbar">
      <div class="navbar-toggle">
        <img src="src/assets/logo.png" style="width: 5rem" alt="">
      </div>
      <div style="display: flex; flex-direction: column; gap: 2rem; color: #667085">
        <div class="navbar-item">
          <q-btn flat round dense to="/" icon="home" label="Home" />
        </div>
        <div class="navbar-item">
          <q-btn flat round dense to="/add-a-recipe" icon="list" label="form" />
        </div>
      </div>
    </div>
    <div class="content">
      <!-- Contenu spécifique à chaque page -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainLayout",
  setup() {
    return {};
  },
};

</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
}

.navbar {
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  margin-right: 10px; /* Ajout d'une marge de 10px à droite de la navbar */
}

.navbar-toggle {
  margin-bottom: 20px;
  cursor: pointer;
}

.navbar-item {
  margin-bottom: 20px;
  cursor: pointer;
}

.content {
  background-color: #EAECF0;
  flex: 1;
  padding: 20px;
  margin-left: 10px; /* Ajout d'une marge de 10px à gauche de la page */
}
</style>
