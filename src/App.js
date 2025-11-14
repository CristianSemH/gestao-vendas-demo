import React, { useEffect, useContext, useState } from 'react';
import Nav from './components/layout/nav'
import { Router } from './routes/index'
import StoreContext from './components/context/Context';
import NavTop from './components/layout/navTop';

const App = () => {

  const { token } = useContext(StoreContext)

  useEffect(() => {

    const scriptIcon = document.createElement("script");
    const scriptIcon2 = document.createElement("script");

    scriptIcon.type = "module";
    scriptIcon.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js';
    scriptIcon.async = false;

    scriptIcon2.noModule = true;
    scriptIcon2.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js';
    scriptIcon2.async = false;

    document.body.appendChild(scriptIcon);
    document.body.appendChild(scriptIcon2);
    return () => {
      document.body.removeChild(scriptIcon);
      document.body.removeChild(scriptIcon2);
    }
  }, []);

  return (
    <>
      {token ? <MainContainer></MainContainer> : null}
      {token ? null : <Router></Router>}
    </>
  );
};

function MainContainer() {

  const [MenuOpen, setMenuOpen] = useState(false)

  return (
    <div className="main">
      <Nav MenuOpen={MenuOpen} setMenuOpen={setMenuOpen}></Nav>
      <div className="main-nav-container">
        <NavTop MenuOpen={MenuOpen} setMenuOpen={setMenuOpen}></NavTop>
        <div className="main-container">
          <Router></Router>
        </div>
      </div>
    </div>
  )
}

export default App;

