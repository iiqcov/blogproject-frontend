import axios from 'axios';
import Cookies from 'js-cookie';

export const useApi = () => {
  const token = Cookies.get('token');

  const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  return api;
};
