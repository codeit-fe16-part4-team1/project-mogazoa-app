import axios from 'axios';

export const authAPI = axios.create({
  baseURL: '',
  timeout: 20000,
});

export default authAPI;
