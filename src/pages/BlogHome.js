import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from '../common/Header'
import axios from 'axios';


const BlogHome = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');
        setIsLoggedIn(!!token);
    }, []);

    const goToArticles = () => {
        navigate('/articles');
    };

    const goToWriteArticle = () => {
        const token = Cookies.get('token');
        if (!token) {
            alert('로그인이 필요합니다.');
            navigate('/login');
        } else {
            navigate('/write-article');
        }
    };

    const goToLogin = () => {
        navigate('/login');
    }

    const goToSignup = () => {
        navigate('/sign-up');
    }

    const goToLogout = async() => {
        try {
            // 서버로 로그아웃 요청 보내기
            await axios.post('http://localhost:8080/api/logout', {}, {
                withCredentials: true
            });
            // 쿠키 제거
            Cookies.remove('token');
            // 로그인 상태 업데이트
            setIsLoggedIn(false);
            // 홈페이지로 리다이렉트
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <Header/>
            <h2>HOME</h2>
            <button onClick={goToArticles}>글 보러가기</button>
            {isLoggedIn ? (
                // 로그인 상태일 때 보여줄 버튼
                <>
                    <button onClick={goToWriteArticle}>글 작성하기</button>
                    <button onClick={goToLogout}>로그아웃</button>
                </>
            ) : (
                // 로그아웃 상태일 때 보여줄 버튼
                <>
                    <button onClick={goToLogin}>로그인</button>
                    <button onClick={goToSignup}>회원가입</button>
                </>
            )}
        </div>
    );
}

export default BlogHome;