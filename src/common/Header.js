import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css'

const Header = () => {
    const navigate = useNavigate();

    const handleBlogClick = () => {
        navigate("/");
    };

    const handleDevelopmentClick = () => {
        navigate("/Blog-Development");
    };

    return (
        <header className="header">
            <div className="header-content">
                <h2 onClick={handleBlogClick} className="header-title">BLOG</h2>
                <nav className="header-nav">
                    <p onClick={handleDevelopmentClick} className="header-link">Blog Development</p>
                </nav>
            </div>
        </header>
    );
};

export default Header;
