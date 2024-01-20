<!-- SignupForm.vue -->

<template>
  <div class="container mb-4">
    <h1>New Request</h1>
    <!-- Display message if form is invalid -->
    <div v-if="!isFormValid" class="alert alert-warning">
      Simpliroste ola ta pedia.
    </div>
    <pre>{{ data }}</pre>
  </div>
  <div class="container mb-4">

    <div class="mb-2">
      <label for="username">User Name</label>
      <input class="form-control" id="username" v-model="userData.username" type="text" />
    </div>
    <div class="mb-2">
      <label for="email">email</label>
      <input class="form-control" id="email" v-model="userData.email" type="email" />
    </div>
    <div class="mb-2">
      <label for="password">password</label>
      <input class="form-control" id="password" v-model="userData.password" type="password" />
    </div>
    <div class="">
      <button class="btn btn-primary" @click="submitForm" type="button">Submit Request</button>
    </div>
  </div>
</template>

<script>
import {useRouter} from "vue-router";


export default {
  data() {
    return {
      userData: {
        username: '',
        email: '',
        password: '',
      },
    };
  },
  methods: {
    async submitForm() {
      const apiUrl = 'http://localhost:9090/api/auth/signup';

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.userData),
        });

        if (!response.ok) {
          alert('Sign up Failed');
          throw new Error(`Signup failed: ${response.statusText}`);

        }

        const responseData = await response.json();
        console.log('Signup successful:', responseData);
        alert('Signup successful')
        // You can redirect or perform other actions on successful signup
      } catch (error) {
        alert('Sign up Failed');
        console.error('Signup failed:', error.message);
        // Handle errors, display error messages, etc.
      }
    },
  },
};
</script>

<style scoped>
/* Add your styling here if needed */
</style>
