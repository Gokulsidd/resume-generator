import axios from 'axios';

const api = axios.create({
  baseURL: 'https://resume-generator-backend-hwmi.onrender.com', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;