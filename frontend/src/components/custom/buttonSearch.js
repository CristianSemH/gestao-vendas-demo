import React from 'react';

const ButtonSearch = ({ eventOnChange }) => {
    return (
        <div className='filters float-start'>
            <input name='nome' className='input-filter-list' type='text' placeholder='Pesquisar' onChange={eventOnChange} autoComplete='off'></input>
            <span className='button-filter-list'><ion-icon name="search"></ion-icon></span>
        </div>
    )
}

export default ButtonSearch;