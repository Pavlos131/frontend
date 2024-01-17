import { ref } from 'vue';
import { useApplicationStore } from '@/stores/application.js';

const store = useApplicationStore();

export function PostData(urlRef, authRef, bodyRef) {
    const response = ref(null);
    const error = ref(null);
    const loading = ref(false);

    const performPost = () => {
        loading.value = true;
        error.value = null; // Reset error before new request

        // Configure headers
        const headers = {
            'Content-Type': 'application/json'
        };

        if (authRef.value === true) {
            headers['Authorization'] = 'Bearer ' + store.userData.accessToken;
        }

        // Configure the request
        const config = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(bodyRef.value)
        };

        // Perform the fetch request
        fetch(urlRef.value, config)
            .then(response => {
                if (!response.ok) {
                    // Handle HTTP errors
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                response.value = data; // Set the response data
            })
            .catch(err => {
                error.value = err.message || 'An error occurred'; // Handle fetch errors
            })
            .finally(() => {
                loading.value = false;
            });
    };

    return { response, error, loading, performPost };
}
