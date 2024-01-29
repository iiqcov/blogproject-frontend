import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useMemo } from 'react';

export function useApi() {
  const [cookies] = useCookies(['token']); 

  const baseURL = 'http://localhost:8080';

  const api = useMemo(() => axios.create({
    baseURL: baseURL,
    headers: {
      'Content-Type': 'application/json',
    }
  }), []);

  if (cookies.token) { 
    api.defaults.headers.common['Authorization'] = `Bearer ${cookies.token}`; // 'myToken'을 'token'으로 변경
  }

  return api;
}
