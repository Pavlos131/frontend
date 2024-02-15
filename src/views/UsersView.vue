<script setup>
import { ref, watchEffect } from 'vue';


import { useRemoteData } from "@/composables/useRemoteData.js";
import { useRemoteDataGET } from '@/composables/useRemoteDataGET.js';

import router from '@/router';


const formattedData = ref([]);

const { data, error, loading } = useRemoteDataGET('http://localhost:9090/api/users/', true);
watchEffect(() => {
    if (data.value) {
        formattedData.value = data.value.map(user => ({
            ...user,
            id: user.id || 'N/A',
            username: user.username || 'N/A',
            email: user.email || 'N/A',
            roles: user.roles || 'N/A' 
        }));
    }
})

async function makemod(id) {
    
        // Make mod
         useRemoteDataGET('http://localhost:9090/api/users/makemod/' + id,true);
         
         
         
     
}

async function removemod(id) {
    
        // Make mod
         useRemoteDataGET('http://localhost:9090/api/users/removemod/' + id,true);
         
    
        
        
}
async function deleteuser(id) {
  const urlRef = ref(`http://localhost:9090/api/users/${id}`);
  const authRef = ref(true); 
  const methodRef = ref("DELETE"); 

  const { data, error, loading, performRequest } = useRemoteData(urlRef, authRef, methodRef);

  performRequest(); 
  const entryIndex = formattedData.value.findIndex(entry => entry.id === id);
        if (entryIndex !== -1) {
            formattedData.value.splice(entryIndex, 1);
        }
         
  
}

</script>

<template>
  <div class="users-view">
    <h2>Users kante reload meta apo removemod i makemod</h2>
    <div v-for="user in formattedData" :key="user.id" class="user-details">
      <p><strong>ID:</strong> {{ user.id }}</p>
      <p><strong>Username:</strong> {{ user.username }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>

      <div>
        <strong>Roles:</strong>
        <ul>
          <li v-for="role in user.roles" :key="role">{{ role }}</li>
        </ul>
      </div>
      <button @click="deleteuser(user.id)"  >delete user</button>
      <button @click="makemod(user.id)"  >makemod</button>
     <button @click="removemod(user.id)">remove mod</button>
      <RouterLink
        class=".custom-button"
        :to="{ name: 'edituser', params: { id: user.id } }"
      >Edit User</RouterLink>
    </div>
  </div>
</template>

  <style scoped>
  .custom-button {
  display: inline-block;
  padding: 6px 12px;
  margin-top: 10px;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
  color: #fff;
  background-color: #337ab7;
  border-color: #2e6da4;
  text-decoration: none; /* Remove underline */
}
  .users-view {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .user-details {
    margin-bottom: 20px;
    padding: 15px;
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 4px;
  }

  .user-details p {
    margin: 5px 0;
    color: #333;
    font-size: 16px;
  }

  .user-details strong {
    color: #007bff;
  }

  .users-view h2 {
    color: #333;
    text-align: center;
    margin-bottom: 20px;
  }

  .user-details ul {
    list-style-type: none;
    padding: 0;
  }

  .user-details li {
    background-color: #f0f0f0;
    margin: 5px 0;
    padding: 5px 10px;
    border-radius: 2px;
    font-size: 14px;
  }
</style>
