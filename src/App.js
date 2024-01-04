import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogHome from './pages/BlogHome';
import WriteArticle from './pages/WriteArticle';
import ArticleList from './components/ArticleList';
import Article from './components/ArticleById'; 
import UpdateArticle from './pages/UpdateArticle';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SigunupPage';
import Cookies from 'js-cookie';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="" element={<BlogHome />} />
                <Route path="/articles" element={<ArticleList />} />
                <Route path="/article/:id" element={<Article />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/sign-up" element={<SignupPage />} />
                {isAuthenticated && (
                    <>
                        <Route path="/write-article" element={<WriteArticle />} />
                        <Route path="/edit-article/:id" element={<UpdateArticle />} />
                    </>
                )}
            </Routes>
        </Router>
    );
}

export default App;
