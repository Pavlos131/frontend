<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useRemoteData } from "@/composables/useRemoteData.js";
const formDataRef = ref({
  username: "",
  password: "",
  email: ""
});
const submissionAttempted = ref(false); 
const router = useRouter();
const route = useRoute();
const userid = ref(route.params.id);
console.log(userid.value);
const urlRef = computed(() => {
  return 'http://localhost:9090/api/users/edituser/' + userid.value;
});
const authRef = ref(true);
const methodRef = ref("POST");
const { data, performRequest } = useRemoteData(urlRef, authRef, methodRef,formDataRef);
const isFormValid = computed(() => {
  return formDataRef.value.username && formDataRef.value.password && formDataRef.value.email;
});
const onSubmit = () => {
  if (isFormValid.value) {
    performRequest(formDataRef.value);
  } else {
    submissionAttempted.value = true; 
  }
};
</script>



<template>
  <div class="container mb-4">
    <h1>Edit User</h1>
    <div v-if="data">
      <pre>{{ data }}</pre>
    </div>

    <!-- Message displayed when the form is invalid after a submission attempt -->
    <div v-if="submissionAttempted && !isFormValid" class="alert alert-warning">
      Sibliroste ola ta pedia .
    </div>

    <!-- Form fields -->
    <div class="mb-2">
      <label for="username">Username</label>
      <input class="form-control" id="username" v-model="formDataRef.username" type="text" />
    </div>
    <div class="mb-2">
      <label for="password">Password</label>
      <input class="form-control" id="password" v-model="formDataRef.password" type="password" />
    </div>
    <div class="mb-2">
      <label for="email">Email</label>
      <input class="form-control" id="email" v-model="formDataRef.email" type="email" />
    </div>

    <!-- Submit button -->
    <div>
      <button class="btn btn-primary" @click="onSubmit" type="button">Submit</button>
    </div>
  </div>
</template>