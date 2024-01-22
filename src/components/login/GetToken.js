// FetchToken.js
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function FetchToken() {
  const navigate = useNavigate();

  useEffect(() => {
    const url = window.location.pathname;
    if (url.startsWith('/qcov')) {
      const fetchData = async () => {
        const result = await axios(`http://localhost:8080${url}`, { withCredentials: true });

        if (result.status === 200) {
          navigate('/');
        }
      };
      fetchData();
    } else {
      console.error('Invalid URL');
    }
  }, [navigate]);

  return null;
}
