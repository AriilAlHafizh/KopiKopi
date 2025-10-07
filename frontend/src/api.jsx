import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', 
  withCredentials: true // <-- INI YANG PALING PENTING
});

export default api;