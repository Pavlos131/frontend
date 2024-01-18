<script setup>
import { ref,computed } from "vue";
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

const isFormValid = computed(() => {
  return formDataRef.value.companyname && formDataRef.value.katastatiko && 
         formDataRef.value.edra && formDataRef.value.partner1 && 
         formDataRef.value.partner2;
});

const onSubmit = () => {
  // Only submit if all fields are filled
  if (isFormValid.value) {
    performRequest(formDataRef.value);
  } else {
    alert("Simpliroste ola ta pedia.");
  }
};

</script>


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
