import React from 'react';

const header = (parms) => {
    const { title, nav } = parms;
    return (
        <div className='list-header'>
            <div className='list-header-title'>
                <h4>{title}</h4>
            </div>
            <div className='list-header-nav'>
                <p>{nav}</p>
            </div>
        </div>
    )
};

export default header;