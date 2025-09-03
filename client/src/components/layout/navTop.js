import React from 'react';

const NavTop = ({ MenuOpen, setMenuOpen }) => {

    return (
        <div className="nav-top position-relative">
            <div onClick={() => setMenuOpen(MenuOpen ? false : true)} className="nav-top-menu-icon"><ion-icon name="menu-outline"></ion-icon></div>
            <div className="notification"><ion-icon name="notifications-outline"></ion-icon></div>
        </div>
    )
}

export default NavTop;