import React, { useState, useEffect, useContext } from 'react'
import { getClientes, deleteCliente } from '../../services/cliente'
import { Link, useNavigate } from 'react-router-dom'
import HeaderList from '../custom/headerList'
import Pagination from '../custom/Pagination'
import ButtonAction from '../custom/buttonAction'
import ButtonSearch from '../custom/buttonSearch'
import ButtonNew from '../custom/buttonNew'
import StoreContext from '../context/Context'

const ClienteList = () => {

    const navigate = useNavigate()
    const [clientes, setClientes] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [filtro, setFiltro] = useState('');
    const [totalRows, setTotalRows] = useState(0);
    const [isError, setIsError] = useState(false)
    const { setToken, token } = useContext(StoreContext)

    const loadClientes = async (page, filtro, token) => {
        const limit = 9;

        const offset = (page - 1) * limit;

        const response = await getClientes(limit, offset, filtro, token)
        const count = response.count ? response.count : 0
        const total = Math.ceil(count / limit);

        if (response.response?.status === 401) {
            setIsError(true)
        }

        setClientes(response.rows);
        setTotalPages(total);
        setTotalRows(count)
    };

    const handleDelete = async (clienteId) => {
        await deleteCliente(clienteId, token);
        if (currentPage === 1) {
            loadClientes(1, '', token);
        } else {
            setCurrentPage(1)
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleFiltroChange = (e) => {
        setFiltro(e.target.value);
    };

    useEffect(() => {
        loadClientes(currentPage, filtro, token);
    }, [currentPage, filtro, token]);

    useEffect(() => {
        function ReturnLogin() {
            setToken(null)
            navigate('/login')
        }

        if (isError) {
            ReturnLogin()
        }
    }, [isError, navigate, setToken]);


    return (
        <div className="col-12">
            <HeaderList title="Lista de cliente" nav="Home / cliente"></HeaderList>
            <div className='card-custom shadow-sm'>
                <div className='card-custom-header mb-3 col-12'>
                    <ButtonNew eventOnClick={() => navigate('/cliente/create')}></ButtonNew>
                    <ButtonSearch eventOnChange={handleFiltroChange}></ButtonSearch>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Código</th>
                                <th>Nome</th>
                                <th>Tipo pessoa</th>
                                <th>CPF/CNPJ</th>
                                <th>Celular</th>
                                <th>Whatsapp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes?.length > 0 && (clientes.map((cliente) => (
                                <tr key={cliente.id}>
                                    <td>
                                        <ButtonAction eventDelete={() => handleDelete(cliente.id)} eventUpdate={() => navigate(`/cliente/update/${cliente.id}`)}></ButtonAction>
                                    </td>
                                    <td>{cliente.id} </td>
                                    <td>{cliente.nome}</td>
                                    <td>{cliente.TipoPessoa === 'F' ? 'Física' : 'Jurídico'}</td>
                                    <td>{cliente.cpf ? cliente.cpf : cliente.cnpj}</td>
                                    <td>{cliente.celular} </td>
                                    <td ><div className='list-client-zap'><Link target="_blank" to={`https://web.whatsapp.com/send?phone=${cliente.celular.replace('(', '').replace(')', '').replace('-', '').replace(' ', '')}`}><ion-icon name="logo-whatsapp"></ion-icon></Link></div></td>
                                </tr>
                            )))}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    currentPage={currentPage}
                    handlePageChange={handlePageChange}
                    totalPages={totalPages}
                    totalRows={totalRows}
                ></Pagination>
            </div>
        </div >
    );
};

export default ClienteList;