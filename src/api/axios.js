import axios from 'axios';
import { useCookies } from 'react-cookie';

export function useApi() {
  const [cookies] = useCookies(['myToken']);

  const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookies.myToken}`
    }
  });

  return api;
}
