<template>
  <div class="home-page">
    <h1 class="page-title">Dashboard</h1>
    <div class="dashboard-container">
      <div class="task-container">
        <h2 class="section-title">Tasks</h2>
        <Task class="task-list" />
      </div>
      <div class="user-container">
        <h2 class="section-title">Users</h2>
        <Users class="user-list" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Task from '@/components/TaskList.vue';
import Users from '@/components/UserList.vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    Task,
    Users,
  },
});
</script>

<style scoped>
.home-page {
  padding: 2rem;
  max-width: 1600px;
  margin: 0 auto;
}

.page-title {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: left;
}

.dashboard-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.task-container, .user-container {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: all 0.3s ease;
  width: 100%;
}

.task-container:hover, .user-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.section-title {
  font-size: 1.5rem;
  color: #34495e;
  margin-bottom: 1rem;
  text-align: left;
}

.task-list, .user-list {
  width: 100%;
  overflow-x: auto;
}

/* Adjust the height of the task list if needed */
.task-list {
  max-height: 400px;
  overflow-y: auto;
}

/* Dark mode styles */
:root {
  --bg-color: #ffffff;
  --text-color: #2c3e50;
  --card-bg: #ffffff;
  --card-shadow: rgba(0, 0, 0, 0.1);
}

.dark-mode {
  --bg-color: #121212;
  --text-color: #ffffff;
  --card-bg: #1e1e1e;
  --card-shadow: rgba(255, 255, 255, 0.1);
}

.home-page {
  background-color: var(--bg-color);
  color: var(--text-color);
}

.page-title, .section-title {
  color: var(--text-color);
}

.task-container, .user-container {
  background-color: var(--card-bg);
  box-shadow: 0 4px 6px var(--card-shadow);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .home-page {
    padding: 1rem;
  }

  .task-container, .user-container {
    padding: 1rem;
  }
}
</style>