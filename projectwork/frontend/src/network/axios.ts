// src/network/axiosInstance.ts
import axios from 'axios';

// Create an Axios instance
const API = axios.create({
    baseURL: 'http://localhost:8080/api', // Replace with your backend URL
});

// Add a request interceptor to include the token
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default API;