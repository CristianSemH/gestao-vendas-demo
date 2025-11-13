import React, { useState, useEffect, useContext } from 'react';
import { getTipoEnderecos, deleteTipoEndereco } from '../../services/tipoEndereco';
import { useNavigate } from 'react-router-dom'
import HeaderList from '../custom/headerList'
import Pagination from '../custom/Pagination'
import ButtonAction from '../custom/buttonAction'
import ButtonSearch from '../custom/buttonSearch'
import ButtonNew from '../custom/buttonNew'
import StoreContext from '../context/Context';

const TipoEnderecoList = () => {

    const navigate = useNavigate()

    const [tipoEnderecos, setTipoEnderecos] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [filtro, setFiltro] = useState('');
    const [totalRows, setTotalRows] = useState(0);
    const [isError, setIsError] = useState(false)
    const { setToken, token } = useContext(StoreContext)

    const loadTipoEnderecos = async (page, filtro, token) => {

        const limit = 9;

        const offset = (page - 1) * limit;

        const response = await getTipoEnderecos(limit, offset, filtro, token)
        const count = response.count ? response.count : 0
        const total = Math.ceil(count / limit);

        if (response.response?.status === 401) {
            setIsError(true)
        }

        setTipoEnderecos(response.rows);
        setTotalPages(total);
        setTotalRows(count)
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleFiltroChange = (e) => {
        setFiltro(e.target.value);
    };

    const handleDelete = async (tipoEnderecoId) => {
        await deleteTipoEndereco(tipoEnderecoId, token);
        if (currentPage === 1) {
            loadTipoEnderecos(1, '', token);
        } else {
            setCurrentPage(1)
        }
    };

    useEffect(() => {
        loadTipoEnderecos(currentPage, filtro, token);
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
            <HeaderList title="Lista de tipo endereço" nav="Home / tipo endereço"></HeaderList>
            <div className='card-custom shadow-sm'>
                <div className='card-custom-header mb-3 col-12'>
                    <ButtonNew eventOnClick={() => navigate('/tipoEndereco/create')}></ButtonNew>
                    <ButtonSearch eventOnChange={handleFiltroChange}></ButtonSearch>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Código</th>
                                <th>Descrição</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tipoEnderecos?.length > 0 && (tipoEnderecos.map((tipoEndereco) => (
                                <tr key={tipoEndereco.id}>
                                    <td>
                                        <ButtonAction eventDelete={() => handleDelete(tipoEndereco.id)} eventUpdate={() => navigate(`/tipoEndereco/update/${tipoEndereco.id}`)}></ButtonAction>
                                    </td>
                                    <td>{tipoEndereco.id} </td>
                                    <td>{tipoEndereco.descricao}</td>
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
        </div>
    );
};

export default TipoEnderecoList;