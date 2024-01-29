import { useEffect } from 'react';
import Cookies from 'js-cookie';

const CheckLogin = () => {

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            alert('로그인이 필요합니다.');
        }
    }, []);

    return null;
};

export default CheckLogin;
