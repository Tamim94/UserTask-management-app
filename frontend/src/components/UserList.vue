<template>
  <div class="user-list">
    <h1>All of our users</h1>
    <div class="user-table-container">
      <el-table
          v-if="users.length"
          :data="users"
          style="width: 100%"
          :border="true"
          :stripe="true"
          :loading="loading"
          height="600"
      >
        <el-table-column prop="_id" label="ID" width="220" fixed="left">
          <template #default="scope">
            <el-tag type="primary">
              🆔 {{ scope.row._id }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="fullName" label="Full Name" width="180">
          <template #default="scope">
            <el-tag type="success">
              👤 {{ scope.row.fullName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="job" label="Job" width="150">
          <template #default="scope">
            <el-tag type="warning">
              💼 {{ scope.row.job }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="email" label="Email" width="220">
          <template #default="scope">
            <el-tag type="info">
              📧 {{ scope.row.email }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="tasks" label="Tasks" min-width="200">
          <template #default="scope">
            <el-tooltip
                :content="scope.row.tasks.length > 0 ? scope.row.tasks.join(', ') : 'No tasks'"
                placement="top"
                :hide-after="1000"
            >
              <el-tag type="danger">
                📋 {{ scope.row.tasks.length > 0 ? `${scope.row.tasks.length} task(s)` : 'No tasks' }}
              </el-tag>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import { ElTable, ElTableColumn, ElTag, ElTooltip, ElMessage } from 'element-plus';

interface User {
  _id: string;
  fullName: string;
  job: string;
  email: string;
  tasks: string[];
}

export default defineComponent({
  name: 'UserList',
  components: {
    ElTable,
    ElTableColumn,
    ElTag,
    ElTooltip,
  },
  setup() {
    const users = ref<User[]>([]);
    const loading = ref(true);

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users');
        users.value = response.data.users as User[];
        loading.value = false;
      } catch (error) {
        console.error('Error fetching users:', error);
        ElMessage.error('Failed to fetch users');
        loading.value = false;
      }
    };

    onMounted(fetchUsers);

    return {
      users,
      loading,
    };
  },
});
</script>

<style scoped>
.user-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.user-table-container {
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.el-table {
  margin-top: 20px;
}

.el-table :deep(th) {
  background-color: #f5f7fa;
  color: #606266;
  font-weight: bold;
}

.el-table :deep(td) {
  vertical-align: middle;
}

.el-tag {
  width: 100%;
  text-align: left;
  padding: 4px 8px;
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

.user-list {
  background-color: var(--bg-color);
  color: var(--text-color);
}

.user-table-container {
  background-color: var(--card-bg);
  box-shadow: 0 4px 6px var(--card-shadow);
}

.el-table :deep(th) {
  background-color: var(--card-bg);
  color: var(--text-color);
}

.el-table :deep(td) {
  background-color: var(--card-bg);
  color: var(--text-color);
}
</style>