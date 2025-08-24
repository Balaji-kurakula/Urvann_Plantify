import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export const plantAPI = {
  // Get all plants with filters
  getPlants: (params = {}) => api.get('/plants', { params }),
  
  // Get single plant
  getPlant: (id) => api.get(`/plants/${id}`),
  
  // Add new plant
  addPlant: (plantData) => api.post('/plants', plantData),
  
  // Update plant
  updatePlant: (id, plantData) => api.put(`/plants/${id}`, plantData),
  
  // Delete plant
  deletePlant: (id) => api.delete(`/plants/${id}`),
  
  // Get categories
  getCategories: () => api.get('/plants/categories/list')
};

export default api;
