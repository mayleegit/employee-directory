import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 8000,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(
    (config) => {
        console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        let message = 'Something went wrong. Please try again.';

        if (error.response?.data?.message) {
        message = error.response.data.message;
        } else if (error.code === 'ECONNABORTED') {
        message = 'Request timed out. Please try again.';
        } else if (!error.response) {
        message = 'Cannot connect to server. Please check if backend is running.';
        }

        return Promise.reject(new Error(message));
    }
);

export default api;