<script setup>
import { ref, watchEffect } from 'vue';
import { useRemoteDataGET } from '@/composables/useRemoteDataGET.js';

const { data, error, loading } = useRemoteDataGET('http://localhost:9090/api/requests/', true);
const formattedData = ref([]);

watchEffect(() => {
    if (data.value) {
        formattedData.value = data.value.map(entry => ({
            ...entry,
            id: entry.id || 'N/A',
            companyname: entry.companyname || 'N/A',
            katastatiko: entry.katastatiko || 'N/A',
            edra: entry.edra || 'N/A',
            partner1: entry.partner1 || 'N/A',
            partner2: entry.partner2 || 'N/A',
            afm: entry.afm || 'N/A',
            condition: entry.condition || 'N/A'
        }));
    }
});

async function approve(id) {
    try {
         useRemoteDataGET('http://localhost:9090/api/requests/approve/' + id, true);
        console.log("Approved", id);
        const { data, error, loading } = useRemoteDataGET('http://localhost:9090/api/requests/', true);
        watchEffect(() => {
    if (data.value) {
        formattedData.value = data.value.map(entry => ({
            ...entry,
            id: entry.id || 'N/A',
            companyname: entry.companyname || 'N/A',
            katastatiko: entry.katastatiko || 'N/A',
            edra: entry.edra || 'N/A',
            partner1: entry.partner1 || 'N/A',
            partner2: entry.partner2 || 'N/A',
            afm: entry.afm || 'N/A',
            condition: entry.condition || 'N/A'
        }));
    }
});
s
        const entryIndex = formattedData.value.findIndex(entry => entry.id === id);
        if (entryIndex !== -1) {
            formattedData.value[entryIndex].condition = 'Approved'; 
            formattedData.value[entryIndex].afm = data.afm; 
        }
    } catch (error) {
        console.error("Error approving request:", error);
    }
}

async function disapprove(id) {
    try {
        await useRemoteDataGET('http://localhost:9090/api/requests/disapprove/' + id, true);
        console.log("Disapproved", id);
        // Update the status of the entry
        const entryIndex = formattedData.value.findIndex(entry => entry.id === id);
        if (entryIndex !== -1) {
            formattedData.value[entryIndex].condition = 'Disapproved'; 
            formattedData.value[entryIndex].afm="0" // or any other status indicator
        }
    } catch (error) {
        console.error("Error disapproving request:", error);
    }
}
async function deleteEntry(id) {
    try {
        await useRemoteDataGET('http://localhost:9090/api/requests/delete/' + id, true);
        console.log("Deleted", id);


        const entryIndex = formattedData.value.findIndex(entry => entry.id === id);
        if (entryIndex !== -1) {
            formattedData.value.splice(entryIndex, 1);
        }
    } catch (error) {
        console.error("Error deleting request:", error);
    }
}

</script>



<template>
    <div class="bg-body-tertiary container">
        <div v-if="loading">Loading...</div>
        <div v-if="error">Error fetching data: {{ error }}</div>
        <ul class="data-list" v-if="formattedData.length > 0">
            <li v-for="entry in formattedData" :key="entry.id" class="data-item">
                <button @click="approve(entry.id)" class="button approve-button" >Approve</button>
                <button @click="disapprove(entry.id)" class="button disapprove-button" >Disapprove</button>
                <button @click="deleteEntry(entry.id)" class="button disapprove-button">Delete</button>

                <div>ID: {{ entry.id }}</div>
                <div>Company: {{ entry.companyname }}</div>
                <div>Katastatiko: {{ entry.katastatiko }}</div>
                <div>Edra: {{ entry.edra }}</div>
                <div>Partner 1: {{ entry.partner1 }}</div>
                <div>Partner 2: {{ entry.partner2 }}</div>
                <div>AFM: {{ entry.afm }}</div> <!-- new field -->
                <div>Condition: {{ entry.condition }}</div> <!-- new field -->
            </li>
        </ul>
        <div v-else>No data available.</div>
    </div>
</template>

<style>
.container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
}

.data-list {
    list-style-type: none;
    padding: 0;
}

.data-item {
    background: #f0f0f0;
    border: 1px solid #ddd;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
}

.data-item div {
    margin-bottom: 5px;
}
.button {
    margin-left: 10px;
    padding: 5px 10px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

.approve-button {
    background-color: #4CAF50;
    color: white;
}

.disapprove-button {
    background-color: #f44336;
    color: white;
}

</style>
