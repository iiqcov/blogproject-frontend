import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <div style={{ textAlign: 'center' }}>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h1>blog</h1>
                </Link>
            </div>
        </header>
    );
};

export default Header;