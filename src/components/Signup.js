import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태 변수 추가
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/sign-up', {
                email: email,
                password: password
            }, {
                withCredentials: true
            });
            if (response.status === 200) {
                console.log(response.data);
                navigate('/login');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // 인증에 실패한 경우 로그인 페이지로 리다이렉트
                navigate('/sign-up');
            } else if (error.response && error.response.status === 409) { // 상태 코드가 409인 경우
                setErrorMessage('이미 존재하는 이메일입니다.'); // 에러 메시지 설정
            } else {
                console.error(error);
            }
        }
    };

    const handleLogin = () => {
        navigate('/login');
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
            <button type="submit">Sign Up</button>
            <button type="button" onClick={handleLogin}>Log In</button> {/* Log In 버튼 추가 */}
            {errorMessage && <p>{errorMessage}</p>} {/* 에러 메시지가 있으면 표시 */}
        </form>
    );
};

export default Signup;
