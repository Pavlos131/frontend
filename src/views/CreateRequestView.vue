<script setup>
import { ref } from "vue";
import { useRemoteData } from "@/composables/useRemoteData.js";

// Initialize formDataRef with the structure of your JSON data
const formDataRef = ref({
  companyname: "",
  katastatiko: "",
  edra: "",
  partner1: "",
  partner2: ""
});

const urlRef = ref("http://localhost:9090/api/requests/");
const authRef = ref(true);
const methodRef = ref("POST");

// Destructure the necessary methods from useRemoteData
const { data, performRequest } = useRemoteData(urlRef, authRef, methodRef, formDataRef);

const onSubmit = () => {
  // Ensure formDataRef is passed correctly to the performRequest function
  performRequest(formDataRef.value);
};
</script>


<template>
  <div class="container mb-4">
    <h1>New Request</h1>
  </div>
  <div>
    <pre>{{ data }}</pre>
  </div>
  <div class="container mb-4">
    <!-- Bind v-model directly to formDataRef properties -->
    <div class="mb-2">
      <label for="companyname">Company Name</label>
      <input class="form-control" id="companyname" v-model="formDataRef.companyname" type="text" />
    </div>
    <div class="mb-2">
      <label for="edra">edra</label>
      <input class="form-control" id="edra" v-model="formDataRef.edra" type="text" />
    </div>
    <div class="mb-2">
      <label for="katastatiko">katastatiko</label>
      <input class="form-control" id="katastatiko" v-model="formDataRef.katastatiko" type="text" />
    </div>
    <div class="mb-2">
      <label for="partner1">Partner 1</label>
      <input class="form-control" id="partner1" v-model="formDataRef.partner1" type="text" />
    </div>
    <div class="mb-2">
      <label for="partner2">Partner 2</label>
      <input class="form-control" id="partner2" v-model="formDataRef.partner2" type="text" />
    </div>
    <div class="">
      <button class="btn btn-primary" @click="onSubmit" type="button">Submit Request</button>
    </div>
  </div>
</template>
