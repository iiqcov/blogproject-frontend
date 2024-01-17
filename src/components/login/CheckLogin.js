import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const CheckLogin = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            alert('로그인이 필요합니다.');
            navigate('/login');
        }
    }, [navigate]);

    return null;
};

export default CheckLogin;
