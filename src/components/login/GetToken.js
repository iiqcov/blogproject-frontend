import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useApi} from '../../api/api';

export default function FetchToken() {
  const navigate = useNavigate();
  const api=useApi();

  useEffect(() => {
    const url = window.location.pathname;
    if (url.startsWith('/qcov')) {
      const fetchData = async () => {
        const result = await api.get(`${url}`, { withCredentials: true });

        if (result.status === 200) {
          navigate('/');
        }
      };
      fetchData();
    } 
  }, [navigate, api]);

  return null;
}
