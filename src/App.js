import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogHome from './pages/BlogHome';
import WriteArticle from './pages/WriteArticle';
import ArticleList from './components/ArticleList';
import Article from './components/ArticleById'; 
import UpdateArticle from './pages/UpdateArticle';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SigunupPage';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <Router>
            <Routes>
                {isAuthenticated && (
                    <>
                        <Route path="/write-article" element={<WriteArticle />} />
                        <Route path="/edit-article/:id" element={<UpdateArticle />} />
                    </>
                )}
                {!isAuthenticated && (
                    <>
                        <Route path="" element={<BlogHome />} />
                        <Route path="/articles" element={<ArticleList />} />
                        <Route path="/articles/:id" element={<Article />} />
                        <Route path="/login" element={<LoginPage/>} />
                        <Route path="/sign-up" element={<SignupPage/>}/>
                    </>
                )}
            </Routes>
        </Router>
    );
}

export default App;
