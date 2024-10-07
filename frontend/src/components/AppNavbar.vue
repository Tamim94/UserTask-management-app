<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      :class="{ 'dark-mode': isDarkMode }"
      mode="horizontal"
      @select="handleSelect"
  >
    <el-menu-item :index="'0'" class="logo-item">
      <img src="@/assets/logo2.png" alt="Logo" class="logo" />
    </el-menu-item>
    <router-link to="/" v-slot="{ navigate, href }">
      <el-menu-item :index="'1'" @click="navigate" :href="href">Home</el-menu-item>
    </router-link>
    <router-link to="/about" v-slot="{ navigate, href }">
      <el-menu-item :index="'2'" @click="navigate" :href="href">About</el-menu-item>
    </router-link>
    <router-link to="/login" v-slot="{ navigate, href }">
      <el-menu-item :index="'3'" @click="navigate" :href="href">Login</el-menu-item>
    </router-link>
    <router-link v-if="!isLoggedIn" to="/register" v-slot="{ navigate, href }">
      <el-menu-item :index="'4'" @click="navigate" :href="href">Register</el-menu-item>
    </router-link>
    <el-menu-item v-if="isLoggedIn" :index="'5'" @click="logout">Logout</el-menu-item>
    <el-sub-menu :index="'6'">
      <template #title>More</template>
      <el-menu-item :index="'6-1'">Option 1</el-menu-item>
      <el-menu-item :index="'6-2'">Option 2</el-menu-item>
    </el-sub-menu>
    <el-menu-item :index="'7'" @click="toggleTheme">
      {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
    </el-menu-item>
  </el-menu>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useUserStore } from '@/store/user';

export default defineComponent({
  name: 'AppBar',
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
      console.log(`Selected menu item: ${key}`);
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