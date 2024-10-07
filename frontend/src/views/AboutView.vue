<template>
  <div :class="['about-container', { 'dark-mode': isDarkMode }]">
    <div class="logo-container">
      <img alt="Vue logo" src="../assets/logo2.png" class="logo" />
    </div>
    <h1 class="main-title"><el-icon name="info" /> À propos de ce projet</h1>

    <p class="intro-text">
      Ce projet a été réalisé dans le but d'apprendre et de maîtriser Vue.js 3 avec TypeScript, en utilisant la bibliothèque Element UI pour l'interface utilisateur.
      Il s'agit d'une application web de gestion des utilisateurs et des tâches, connectée à une base de données MongoDB Atlas.
    </p>

    <div class="features-container">
      <h2>Fonctionnalités</h2>
      <ul>
        <li>
          <el-icon name="user" /> Liste des utilisateurs avec leurs informations (nom, profession, email, ID)
        </li>
        <li>
          <el-icon name="document-checked" /> Gestion des tâches (ajout, modification, suppression)
        </li>
        <li>
          <el-icon name="lock" /> Authentification avec pages de connexion et d'inscription
        </li>
      </ul>
    </div>

    <h2>Informations sur le développeur</h2>
    <p>
      <strong>Nom:</strong> Golam Tamim<br>
      <strong>Portfolio:</strong> <a href="https://tamimg-portfolio.web.app" target="_blank">tamimg-portfolio.web.app</a><br>
      <strong>GitHub:</strong> <a href="https://github.com/Tamim94" target="_blank">Tamim94 (github.com)</a><br>
      <strong>Linkedin:</strong> <a href="https://www.linkedin.com/in/tamim-golam" target="_blank">Golam Tamim (linkedin.com)</a>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ElIcon } from 'element-plus';

export default defineComponent({
  name: 'AboutView',
  props: {
    isDarkMode: {
      type: Boolean,
      required: true,
    },
  },
  components: { ElIcon },
});
</script>
<style scoped>
.about-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
  animation: slide-in 1s forwards;
}

.dark-mode.about-container {
  background-color: #1f1f1f;
}

.dark-mode h1,
.dark-mode h2,
.dark-mode p,
.dark-mode ul,
.dark-mode li {
  color: black; /* Set text color to black */
}

.dark-mode a {
  color: #409EFF;
}
h1 {
  color: #409EFF;
  margin-bottom: 20px;
}

.main-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px; /* Adjust spacing between icon and text */
}

h2 {
  color: #606266;
  margin-top: 30px;
}

ul {
  list-style-type: disc;
  margin-left: 40px;
  text-align: left;
}

.features-container {
  margin-top: 20px;
  animation: fade-in 1s forwards;
}

.logo-container {
  margin-bottom: 20px;
}

.logo {
  height: 100px;
  animation: fade-in 1s forwards;
}

.intro-text {
  animation: text-slide-in 1s forwards;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes slide-in {
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes text-slide-in {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>