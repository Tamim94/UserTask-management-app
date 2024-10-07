<template>
  <div class="registration-container">
    <h1 class="title">Create Account</h1>
    <el-form
        @submit.prevent="register"
        :model="form"
        :rules="rules"
        ref="formRef"
        label-position="top"
        class="registration-form"
    >
      <el-form-item label="Full Name" prop="fullName">
        <el-input v-model="form.fullName" prefix-icon="el-icon-user"></el-input>
      </el-form-item>
      <el-form-item label="Job" prop="job">
        <el-input v-model="form.job" prefix-icon="el-icon-suitcase"></el-input>
      </el-form-item>
      <el-form-item label="Role" prop="role">
        <el-select v-model="form.role" placeholder="Select role" style="width: 100%">
          <el-option label="RH" value="rh"></el-option>
          <el-option label="Admin" value="admin"></el-option>
          <el-option label="Employee" value="employee"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input v-model="form.email" prefix-icon="el-icon-message" type="email"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input v-model="form.password" prefix-icon="el-icon-lock" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" :loading="loading" class="submit-button">Register</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { ElMessage, ElForm } from 'element-plus';
import router from "@/router";
import { useUserStore } from '@/store/user'; // Import useUserStore

export default defineComponent({
  name: 'CreateAccountView',
  setup() {
    const formRef = ref<InstanceType<typeof ElForm>>();
    const loading = ref(false);
    const userStore = useUserStore(); // Initialize userStore

    const form = reactive({
      fullName: '',
      job: '',
      role: 'employee',
      email: '',
      password: '',
    });

    const rules = {
      fullName: [{ required: true, message: 'Please enter your full name', trigger: 'blur' }],
      job: [{ required: true, message: 'Please enter your job', trigger: 'blur' }],
      role: [{ required: true, message: 'Please select a role', trigger: 'change' }],
      email: [
        { required: true, message: 'Please enter your email', trigger: 'blur' },
        { type: 'email', message: 'Please enter a valid email address', trigger: 'blur' }
      ],
      password: [
        { required: true, message: 'Please enter a password', trigger: 'blur' },
        { min: 6, message: 'Password must be at least 6 characters long', trigger: 'blur' }
      ],
    };

    const register = async () => {
      if (!formRef.value) return;

      await formRef.value.validate(async (valid) => {
        if (valid) {
          loading.value = true;
          try {
            const response = await fetch('http://localhost:3000/users', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(form),
            });

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
              const data = await response.json();
              if (response.ok) {
                ElMessage.success('Registration successful!');
                // Reset form after successful registration
                formRef.value?.resetFields();

                // Automatically log in the user
                await loginUser(form.email, form.password);
              } else {
                ElMessage.error(`Registration failed: ${data.message}`);
              }
            } else {
              const text = await response.text();
              ElMessage.error(`Unexpected response: ${text}`);
            }
          } catch (error) {
            console.error('Error:', error);
            ElMessage.error('An error occurred during registration.');
          } finally {
            loading.value = false;
          }
        } else {
          ElMessage.warning('Please fill in all required fields correctly.');
        }
      });
    };

    const loginUser = async (email: string, password: string) => {
      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
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
      }
    };

    return {
      formRef,
      form,
      rules,
      register,
      loading,
    };
  },
});
</script>

<style scoped>
.registration-container {
  max-width: 400px;
  margin:  auto;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  color: #409EFF;
  margin-bottom: 30px;
}

.registration-form {
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

:deep(.el-select) {
  width: 100%;
}

:deep(.el-button) {
  border-radius: 4px;
}
</style>