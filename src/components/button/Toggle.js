import React from 'react';

import '../../styles/Toggle.css'

const Toggle = ({isToggled, setIsToggled}) => {

    const handleToggle = () => {
        setIsToggled(isToggled => !isToggled);
    };

    return (
        <div className={`toggle ${isToggled ? 'toggled' : ''}`} onClick={handleToggle}>
            <div className="toggle-button" />
        </div>
    );
};

export default Toggle;
