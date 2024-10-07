<template>
  <div class="login-container">
    <h1 class="title">Login</h1>
    <el-form
        @submit.prevent="login"
        :model="form"
        :rules="rules"
        ref="formRef"
        label-position="top"
        class="login-form"
    >
      <el-form-item label="Email" prop="email">
        <el-input v-model="form.email" prefix-icon="el-icon-user" type="email"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input v-model="form.password" prefix-icon="el-icon-lock" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" :loading="loading" class="submit-button">Login</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { ElMessage, ElForm } from 'element-plus';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';

export default defineComponent({
  name: 'LoginView',
  setup() {
    const formRef = ref<InstanceType<typeof ElForm>>();
    const loading = ref(false);
    const router = useRouter();
    const userStore = useUserStore();

    const form = reactive({
      email: '',
      password: '',
    });

    const rules = {
      email: [
        { required: true, message: 'Please enter your email', trigger: 'blur' },
        { type: 'email', message: 'Please enter a valid email address', trigger: 'blur' }
      ],
      password: [
        { required: true, message: 'Please enter a password', trigger: 'blur' },
        { min: 6, message: 'Password must be at least 6 characters long', trigger: 'blur' }
      ],
    };

    const login = async () => {
      if (!formRef.value) return;

      await formRef.value.validate(async (valid) => {
        if (valid) {
          loading.value = true;
          try {
            const response = await fetch('http://localhost:3000/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(form),
            });

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
              const data = await response.json();
              if (response.ok && !data.error) {
                ElMessage.success('Login successful!');
                userStore.setUser(data.user);
                router.push('/');
              } else {
                ElMessage.error(`Login failed: ${data.message}`);
              }
            } else {
              const text = await response.text();
              ElMessage.error(`Unexpected response: ${text}`);
            }
          } catch (error) {
            console.error('Error:', error);
            ElMessage.error('An error occurred during login.');
          } finally {
            loading.value = false;
          }
        } else {
          ElMessage.warning('Please fill in all required fields correctly.');
        }
      });
    };

    return {
      formRef,
      form,
      rules,
      login,
      loading,
    };
  },
});
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto; /* Added top and bottom margin for spacing */
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center; /* Center the form horizontally */
  /* Remove min-height: 100vh; */
}
.title {
  text-align: center;
  color: #409EFF;
  margin-bottom: 30px;
}

.login-form {
  margin-top: 20px;
}

.submit-button {
  width: 100%;
}

:deep(.el-form-item__label) {
  font-weight: bold;
}

:deep(.el-input__inner) {
  border-radius: 4px;
}

:deep(.el-button) {
  border-radius: 4px;
}
</style>