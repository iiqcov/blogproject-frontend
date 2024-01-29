import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {useApi} from '../api/api';

import User from './User'; 

const UserPage = () => {
    const [user, setUser] = useState(null);
    const api=useApi();

    const fetchUser = async () => {
        try {
            const response = await axios.get('/user');
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
