<template>
  <div class="request-login-container">
    <div class="request-login-box">
      <h2>Welcome Back!</h2>
      <p>Your email is already registered in our system.</p>
      <p>Please log in to continue.</p>
      <router-link :to="`/sign-in?token=${props.token}&email=${props.email}`" class="login-link">Login</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['token', 'email'])
</script>

<style scoped>
.request-login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.request-login-box {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
}

h2 {
  margin-bottom: 1rem;
}

p {
  margin-bottom: 1rem;
}

.login-link {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.login-link:hover {
  background-color: #0056b3;
}
</style>
