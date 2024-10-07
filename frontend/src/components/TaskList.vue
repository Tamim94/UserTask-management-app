<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue';
import axios from 'axios';
import { ElTable, ElTableColumn, ElButton, ElMessageBox, ElMessage, ElDialog, ElForm, ElFormItem, ElInput, ElDatePicker, ElSelect, ElOption } from 'element-plus';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
  userId: string;
}

export default defineComponent({
  name: 'TaskList',
  components: {
    ElTable,
    ElTableColumn,
    ElButton,
    ElDialog,
    ElForm,
    ElFormItem,
    ElInput,
    ElDatePicker,
    ElSelect,
    ElOption,
  },
  setup() {
    const tasks = ref<Task[]>([]);
    const editDialogVisible = ref(false);
    const addDialogVisible = ref(false);
    const editingTask = reactive<Task>({
      _id: '',
      title: '',
      description: '',
      status: '',
      dueDate: '',
      userId: '',
    });
    const newTask = reactive<Omit<Task, '_id'>>({
      title: '',
      description: '',
      status: 'to-do',
      dueDate: new Date().toISOString(),
      userId: '', // Add userId here
    });

    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/tasks');
        tasks.value = response.data.tasks;
      } catch (error) {
        console.error('Error fetching tasks:', error);
        ElMessage.error('Failed to fetch tasks');
      }
    };

    const getStatusType = (status: string) => {
      switch (status) {
        case 'to-do': return 'info';
        case 'in-progress': return 'warning';
        case 'done': return 'success';
        default: return '';
      }
    };

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleDateString();
    };

    const openAddDialog = () => {
      Object.assign(newTask, {
        title: '',
        description: '',
        status: 'to-do',
        dueDate: new Date().toISOString(),
        userId: '', // Reset userId
      });
      addDialogVisible.value = true;
    };

    const addTask = async () => {
      try {
        const response = await axios.post('http://localhost:3000/tasks', newTask);
        tasks.value.push(response.data);
        addDialogVisible.value = false;
        ElMessage.success('Task added successfully');
      } catch (error) {
        console.error('Error adding task:', error);
        ElMessage.error('Failed to add task');
      }
    };

    const openEditDialog = (task: Task) => {
      Object.assign(editingTask, task);
      editDialogVisible.value = true;
    };

    const saveEditedTask = async () => {
      try {
        const response = await axios.put(`http://localhost:3000/tasks/${editingTask._id}`, editingTask);
        const index = tasks.value.findIndex(t => t._id === editingTask._id);
        if (index !== -1) {
          tasks.value[index] = response.data.task;
        }
        editDialogVisible.value = false;
        ElMessage.success('Task updated successfully');
      } catch (error) {
        console.error('Error updating task:', error);
        ElMessage.error('Failed to update task');
      }
    };

    const deleteTask = async (taskId: string) => {
      try {
        await axios.delete(`http://localhost:3000/tasks/${taskId}`);
        tasks.value = tasks.value.filter(task => task._id !== taskId);
        ElMessage.success('Task deleted successfully');
      } catch (error) {
        console.error('Error deleting task:', error);
        ElMessage.error('Failed to delete task');
      }
    };

    onMounted(fetchTasks);

    return {
      tasks,
      formatDate,
      openAddDialog,
      addTask,
      openEditDialog,
      saveEditedTask,
      deleteTask,
      editDialogVisible,
      addDialogVisible,
      editingTask,
      newTask,
      getStatusType
    };
  },
});
</script>
<template>
  <div class="task-list">
    <h2>Tasks</h2>

    <el-button type="primary" @click="openAddDialog">Add Task</el-button>
    <el-table :data="tasks" style="width:100%" border stripe>
      <el-table-column prop="title" label="Title" min-width="150" show-overflow-tooltip></el-table-column>
      <el-table-column prop="description" label="Description" min-width="250">
        <template #default="scope">
          <div class="description-cell">{{ scope.row.description }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="Status" width="120">
        <template #default="scope">
          <el-tag :type="getStatusType(scope.row.status)">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="dueDate" label="Due Date" width="120">
        <template #default="scope">
          {{ formatDate(scope.row.dueDate) }}
        </template>
      </el-table-column>
      <el-table-column label="Actions" width="160" fixed="right">
        <template #default="scope">
          <div class="action-buttons">
            <el-button type="primary" size="small" @click="openEditDialog(scope.row)">Edit</el-button>
            <el-button type="danger" size="small" @click="deleteTask(scope.row._id)">Delete</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="addDialogVisible" title="Add Task">
      <el-form :model="newTask">
        <el-form-item label="Title">
          <el-input v-model="newTask.title"></el-input>
        </el-form-item>
        <el-form-item label="Description">
          <el-input v-model="newTask.description" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="newTask.status">
            <el-option label="To Do" value="to-do"></el-option>
            <el-option label="In Progress" value="in-progress"></el-option>
            <el-option label="Done" value="done"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Due Date">
          <el-date-picker v-model="newTask.dueDate" type="date" format="YYYY-MM-DD"></el-date-picker>
        </el-form-item>
        <el-form-item label="User ID">
          <el-input v-model="newTask.userId"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="addTask">Add</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="editDialogVisible" title="Edit Task">
      <el-form :model="editingTask">
        <el-form-item label="Title">
          <el-input v-model="editingTask.title"></el-input>
        </el-form-item>
        <el-form-item label="Description">
          <el-input v-model="editingTask.description" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="editingTask.status">
            <el-option label="To Do" value="to-do"></el-option>
            <el-option label="In Progress" value="in-progress"></el-option>
            <el-option label="Done" value="done"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Due Date">
          <el-date-picker v-model="editingTask.dueDate" type="date" format="YYYY-MM-DD"></el-date-picker>
        </el-form-item>
        <el-form-item label="User ID">
          <el-input v-model="editingTask.userId"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="saveEditedTask">Save</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.task-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.el-table {
  margin-top: 20px;
}

.el-table th {
  background-color: #f5f7fa;
  color: #606266;
  font-weight: bold;
}

.el-table td {
  vertical-align: middle;
}

.description-cell {
  white-space: normal;
  word-break: break-word;
  line-height: 1.5;
  max-height: 3em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.el-tag {
  text-transform: capitalize;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.el-button {
  margin-right: 0; /* Remove margin-right to avoid extra space */
}
</style>²