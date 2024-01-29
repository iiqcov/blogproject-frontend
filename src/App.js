import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogHome from './pages/BlogHome';
import WriteArticle from './pages/WriteArticle';
import Article from './components/ArticleById'; 
import UpdateArticle from './pages/UpdateArticle';
import Cookies from 'js-cookie';
import FolderPage from './pages/FolderPage';
import ForbiddenPage from './pages/ForbiddenPage';

import FetchToken from './components//login/GetToken';

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
            <FetchToken />
            <Routes>
                <Route path="" element={<BlogHome />} />
                <Route path="/article/:id" element={<Article />} />
                <Route path="/write-article" element={<WriteArticle />} />
                <Route path="/edit-article/:id" element={<UpdateArticle />} />
                <Route path='/:folderName' element={<FolderPage/>}/>
                <Route path="/forbidden_page" element={<ForbiddenPage />} /> 
            </Routes>
        </Router>
    );
}

export default App;
