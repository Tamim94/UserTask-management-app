<template>
  <div :class="{ 'dark-mode': isDarkMode }" class="app-container">
    <AppBar :isDarkMode="isDarkMode" @toggle-theme="toggleTheme" />
    <div class="content">
      <router-view />
    </div>
    <div class="footer">
      &copy; 2024 Tamim. All rights reserved.
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import AppBar from './components/AppNavbar.vue';

export default defineComponent({
  name: 'App',
  components: {
    AppBar,
  },
  setup() {
    const isDarkMode = ref(false);

    const toggleTheme = () => {
      isDarkMode.value = !isDarkMode.value;
    };

    return {
      isDarkMode,
      toggleTheme,
    };
  },
});
</script>

<style>
/* Reset default margins and paddings */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body, html {
  height: 100%;
  width: 100%;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  transition: background-color 0.3s, color 0.3s;
}

.dark-mode {
  background-color: #121212;
  color: #ffffff;
}

.dark-mode #app {
  color: #ffffff;
}

.content {
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding: 20px;
}
.footer {
  text-align: center;
  padding: 10px;
  background-color: #f5f5f5;
  color: #333;
}

.dark-mode .footer {
  background-color: #1f1f1f;
  color: #ccc;
}
</style>