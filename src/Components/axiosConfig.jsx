import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://smart-shipment-system.vercel.app/api/v1/users', // Replace with your API base URL
});

export default apiClient;