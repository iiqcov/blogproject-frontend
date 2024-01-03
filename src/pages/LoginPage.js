import React from 'react';
import Login from '../components/Login'; // 경로는 실제 Signup 컴포넌트의 위치에 따라 달라집니다.

const LoginPage = () => {
    return (
        <div>
            <h1>Login Page</h1>
            <Login/>
        </div>
    );
};

export default LoginPage;
