import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태 변수 추가
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');

        if (token) {
            navigate('/');
        } else{
            navigate('/login');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/login', {
                email: email,
                password: password
            },{
                withCredentials: true
            });

            if (response.status === 200) {
                navigate('/');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) { // 에러 상태가 401인 경우
                setErrorMessage('잘못된 이메일 또는 비밀번호'); // 에러 메시지 설정
            } else {
                console.error(error);
            }
        }
    };

    const handleSignUp = () => {
        navigate('/sign-up');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </label>
            <button type="submit">Log In</button>
            <button type="button" onClick={handleSignUp}>Sign Up</button> {/* Sign Up 버튼 추가 */}
            {errorMessage && <p>{errorMessage}</p>}
        </form>
    );
};

export default Login;