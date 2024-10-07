
# Documentation de l'Application Frontend

## Aperçu
Il s'agit d'une application Vue 3 utilisant TypeScript et Element Plus pour les composants d'interface utilisateur. L'application suit le modèle MVC (Model-View-Controller) et interagit avec un backend Node.js.

## Prérequis
- Node.js v18.12.0
- npm (inclus avec Node.js)

## Structure du Projet

```
frontend/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── assets/
│   ├── components/
│   ├── router/
│   ├── store/
│   ├── views/
│   ├── App.vue
│   ├── main.ts
│   └── ...
├── package.json
├── tsconfig.json
└── ...
```

### public/
Contient des actifs statiques comme le fichier index.html.

### src/
Contient le code source principal de l'application.

#### assets/
Contient des actifs statiques comme des images, des polices, etc.

#### components/
Contient des composants Vue réutilisables.

#### router/
Contient la configuration de routage pour l'application.

#### store/
Contient la configuration du store Vuex pour la gestion de l'état.

#### views/
Contient les vues principales (pages) de l'application.

### App.vue
Le composant racine de l'application.

### main.ts
Le point d'entrée de l'application.

## Installation
Pour installer les dépendances, exécutez :
```bash
npm install
```

## Développement
Pour démarrer le serveur de développement, exécutez :
```bash
npm run serve
```

## Build
Pour construire l'application pour la production, exécutez :
```bash
npm run build
```

## Lint
Pour linter le code, exécutez :
```bash
npm run lint
```

## Composants Clés

### AppNavbar.vue
Un composant de barre de navigation utilisant Element Plus.

```vue
<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    :class="{ 'dark-mode': isDarkMode }"
    mode="horizontal"
    @select="handleSelect"
  >
    <!-- Éléments de menu ici -->
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useUserStore } from '@/store/user';

export default defineComponent({
  name: 'AppNavbar',
  props: {
    isDarkMode: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['toggle-theme'],
  setup(props, { emit }) {
    const activeIndex = ref('1');
    const userStore = useUserStore();

    const handleSelect = (key: string, keyPath: string[]) => {
      console.log(`Élément de menu sélectionné : ${key}`);
    };

    const toggleTheme = () => {
      emit('toggle-theme');
    };

    const logout = () => {
      userStore.logout();
    };

    const isLoggedIn = computed(() => !!userStore.state.user);

    return {
      activeIndex,
      handleSelect,
      toggleTheme,
      userStore,
      logout,
      isLoggedIn,
    };
  },
});
</script>

<style scoped>
.el-menu-demo {
  background-color: #545c64;
  color: #fff;
  border: none;
  transition: background-color 0.3s, color 0.3s;
}
.el-menu-demo .el-menu-item {
  color: #fff;
}
.el-menu-demo .el-menu-item:hover {
  background-color: #1f2d3d;
}
.el-menu-demo .el-menu-item.is-active {
  background-color: #1f2d3d;
}
.dark-mode.el-menu-demo {
  background-color: #1f2d3d;
}
.dark-mode.el-menu-demo .el-menu-item {
  color: #ffffff;
}
.dark-mode.el-menu-demo .el-menu-item:hover,
.dark-mode.el-menu-demo .el-menu-item.is-active {
  background-color: #324057;
}
.logo-item {
  padding: 0;
  width: auto;
  margin-right: 20px;
}
.logo {
  height: 40px;
  width: auto;
  vertical-align: middle;
}
</style>
```

## Configuration du Store

### store/index.ts
Configuration du store Vuex.

```ts
import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
    },
  },
  actions: {
    login({ commit }, user) {
      commit('setUser', user);
    },
    logout({ commit }) {
      commit('clearUser');
    },
  },
  modules: {},
});
```

## Configuration du Router

### router/index.ts
Configuration de Vue Router.

```ts
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutView.vue'),
  },
  // Ajoutez plus de routes ici
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
```

## Conclusion
Cette documentation fournit un aperçu de la structure du projet, de l'installation, du développement et des composants clés de l'application Vue 3 utilisant TypeScript et Element Plus. Pour plus d'informations détaillées, consultez la documentation officielle de Vue, TypeScript et Element Plus.
```

This structure is optimized for GitHub's markdown rendering for a clean and professional README.

# USER & Task management NodeJs/VueJs ( En cours / not finished yet)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
