import React from 'react';

const button = ({ eventOnClick, text }) => {
    return (
        <button onClick={eventOnClick} className="button-custom button-custom-primary">{text}</button>
    )
};

export default button;