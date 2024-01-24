import React from 'react';
const Toggle = ({isToggled, setIsToggled}) => {

    const handleToggle = () => {
        setIsToggled(isToggled => !isToggled);
        console.log("change");
    };

    return (
        <div className={`toggle ${isToggled ? 'toggled' : ''}`} onClick={handleToggle}>
            <div className="toggle-button" />
        </div>
    );
};

export default Toggle;
