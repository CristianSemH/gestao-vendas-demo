import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../img/logo.png'
import StoreContext from '../context/Context';

const Nav = ({ MenuOpen, setMenuOpen }) => {

    const { setToken } = useContext(StoreContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        setToken(null)
        navigate('/login')
    }

    return (

        <div className={`nav-main ${MenuOpen ? 'nav-open' : 'nav-hidden'}`}>
            <div className='nav-menu-icon position-absolute top-0 end-0 m-3' onClick={() => setMenuOpen(MenuOpen ? false : true)}>{MenuOpen ? <ion-icon name="chevron-back-outline"></ion-icon> : <ion-icon name="chevron-forward-outline"></ion-icon>}</div>
            <div className="nav-menu-main d-flex flex-column flex-shrink-0 p-2" >

                <div className="nav-header">
                    <div className="nav-header-logo">
                        <img src={logo} alt="Logo" />
                    </div>
                    <div className="nav-header-name-description">
                        <span>Toretto</span>
                    </div>
                </div>

                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <Link to="/categoria"><ion-icon name="pricetags-outline"></ion-icon><div className="nav-item-title"> Categoria</div></Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/formapagamento"><ion-icon name="wallet-outline"></ion-icon><div className="nav-item-title"> Forma pagamento</div></Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/produto"><ion-icon name="library-outline"></ion-icon><div className="nav-item-title"> Produto</div></Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/cliente"><ion-icon name="people-outline"></ion-icon><div className="nav-item-title"> Cliente</div></Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/orcamentovenda"><ion-icon name="cart-outline"></ion-icon><div className="nav-item-title"> Orçamento e vendas</div></Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/despesa"><ion-icon name="beer-outline"></ion-icon><div className="nav-item-title"> Despesa</div></Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/usuario"><ion-icon name="person-circle-outline"></ion-icon><div className="nav-item-title"> Usuários</div></Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/tipoendereco"><ion-icon name="location-outline"></ion-icon><div className="nav-item-title"> Tipo endereços</div></Link>
                    </li>

                    <li className="nav-item"><Link to="/tipogasto">
                        <ion-icon name="cash-outline"></ion-icon><div className="nav-item-title"> Tipo gasto </div></Link>
                    </li>

                    <li className="nav-item"><Link to="/tiposituacaovenda">
                        <ion-icon name="cart-outline"></ion-icon><div className="nav-item-title"> Tipo situação venda</div></Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/tiposituacaodespesa"><ion-icon name="beer-outline"></ion-icon><div className="nav-item-title"> Tipo situação despesa</div></Link>
                    </li>

                </ul>
                <ul className='nav nav-pills'>
                    <li className="nav-item">
                        <button type='button' onClick={handleLogout}> <ion-icon name="exit-outline"></ion-icon><div className="nav-item-title"> Sair </div></button>
                    </li>
                </ul>

            </div>
        </div >
    )
};

export default Nav;

