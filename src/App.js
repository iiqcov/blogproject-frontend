import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogHome from './pages/BlogHome';
import WriteArticle from './pages/WriteArticle';
import HomePage from './pages/HomePage';
import Article from './components/ArticleById'; 
import UpdateArticle from './pages/UpdateArticle';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SigunupPage';
import Cookies from 'js-cookie';
import FolderPage from './pages/FolderPage';

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
                <Route path="/articles" element={<HomePage />} />
                <Route path="/article/:id" element={<Article />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/sign-up" element={<SignupPage />} />
                <Route path="/write-article" element={<WriteArticle />} />
                <Route path="/edit-article/:id" element={<UpdateArticle />} />
                <Route path='/:folderName' element={<FolderPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;