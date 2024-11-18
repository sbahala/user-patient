import axioxInstance from './api.service';

export const authService = {


  register: async (payload) => {
    try {
      const response = await axioxInstance.post('/users/register', payload);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  login: async (payload) => {
    try {
      const response = await axioxInstance.post('/users/login', payload);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  


  getProfile: async () => {
    try {
      let user = await localStorage.getItem('user');
      return JSON.parse(user);
    } catch (error) {
      throw error.response?.data || error.message;
      return null;
      
    }
  },


  getPatients: async () => {
    try {
      const response = await axioxInstance.get('/patients');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },


  deletePatients: async (id) => {
    try {
      const response = await axioxInstance.delete(`/patients/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  addPatients: async (payload) => {
    try {
      const response = await axioxInstance.post(`/patients`,payload );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },


  updatePatients: async (id, payload) => {
    try {
      const response = await axioxInstance.put(`/patients/${id}`, payload);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },


  getPatientsById: async (id) => {
    try {
      const response = await axioxInstance.get(`/patients/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  testPatients: async() => {
    try{
      const response = await axioxInstance.get(`/patients/test-names`);
      return response.data;
    }
    catch{
      throw error.response?.data || error.message;
    }
  }
};