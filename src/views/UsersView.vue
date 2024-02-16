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
    <h2>Users Management kante refresh tin selida meta apo makemod h removemod</h2>
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
      <button @click="deleteuser(user.id)" class="btn-delete">Delete User</button>
      <button @click="makemod(user.id)" class="btn-makemod">Make Mod</button>
      <button @click="removemod(user.id)" class="btn-removemod">Remove Mod</button>
 
      <RouterLink
       
        :to="{ name: 'edituser', params: { id: user.id } }"
      >Edit User</RouterLink>
    </div>
  </div>
</template>
<style scoped>
.custom-button, .btn-delete, .btn-makemod, .btn-removemod {
  display: inline-block;
  padding: 8px 16px;
  margin: 5px; /* Provides spacing around buttons */
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  color: #fff;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
}

/* Specific styles for each button based on their class */
.btn-delete {
  background-color: #d9534f; /* Red for delete */
}
.btn-delete:hover {
  background-color: #c9302c;
}

.btn-makemod {
  background-color: #5bc0de; /* Blue for make mod */
}
.btn-makemod:hover {
  background-color: #31b0d5;
}

.btn-removemod {
  background-color: #f0ad4e; /* Orange for remove mod */
}
.btn-removemod:hover {
  background-color: #ec971f;
}

/* Styles for the rest of the template */
.users-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-details {
  width: 100%;
  margin-bottom: 20px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
  text-align: center;
}

.user-details p, .user-details strong {
  color: #333;
}

.user-details p {
  margin: 10px 0;
  font-size: 16px;
}

.user-details strong {
  display: block;
}

.users-view h2 {
  margin-bottom: 30px;
  font-size: 24px;
}

.user-details ul {
  list-style-type: none;
  padding: 0;
  text-align: center;
}

.user-details li {
  display: inline-block;
  background-color: #f0f0f0;
  margin: 5px;
  padding: 8px 10px;
  border-radius: 2px;
  font-size: 14px;
}
</style>

