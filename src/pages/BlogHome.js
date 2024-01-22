import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

import Header from '../common/Header'
import Sidebar from '../common/Sidebar';

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

    const goToLogout = async() => {
        try {
            await axios.post('http://localhost:8080/api/logout', {}, {
                withCredentials: true
            });
            Cookies.remove('token');
            setIsLoggedIn(false);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
          <Header/>
          <Sidebar/>
          <div style={{ marginLeft: '300px' }}>
            <h2>HOME</h2>
            <button onClick={goToArticles}>글 보러가기</button>
            {isLoggedIn ? (
              <>
                <button onClick={goToWriteArticle}>글 작성하기</button>
                <button onClick={goToLogout}>로그아웃</button>
              </>
            ) : null}
          </div>
        </div>
      );
}

export default BlogHome;
