import React, { useState, useEffect } from 'react';
import axios from 'axios';
import User from './User'; // 경로는 실제 User 컴포넌트의 위치에 따라 달라집니다.

const UserPage = () => {
    const [user, setUser] = useState(null);

    const fetchUser = async () => {
        try {
            const response = await axios.get('http://localhost:8080/user');
            setUser(response.data);
        } catch (error) {
            console.error('Failed to fetch user', error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div>
            <h1>User Page</h1>
            {user && <User user={user} />}
        </div>
    );
};

export default UserPage;
