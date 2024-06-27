import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3002', // Your NestJS backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;