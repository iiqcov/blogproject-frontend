import React from 'react';

const User = ({ user }) => {
    return (
        <div>
            <h2>{user.nickname}</h2>
            <p>{user.email}</p>
        </div>
    );
};

export default User;
