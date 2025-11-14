import React, { useState, useEffect, useContext } from 'react';
import { getTipoGastos, deleteTipoGasto } from '../../services/tipoGasto';
import { useNavigate } from 'react-router-dom'
import HeaderList from '../custom/headerList'
import BadgeCustom from '../custom/badge'
import Pagination from '../custom/Pagination'
import ButtonAction from '../custom/buttonAction'
import ButtonSearch from '../custom/buttonSearch'
import ButtonNew from '../custom/buttonNew'
import StoreContext from '../context/Context';

const TipoGastoList = () => {

    const navigate = useNavigate()

    const [tipoGastos, setTipoGastos] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [filtro, setFiltro] = useState('');
    const [totalRows, setTotalRows] = useState(0);
    const [isError, setIsError] = useState(false)
    const { setToken, token } = useContext(StoreContext)

    const loadTipoGastos = async (page, filtro, token) => {

        const limit = 9;

        const offset = (page - 1) * limit;

        const response = await getTipoGastos(limit, offset, filtro, token)
        const count = response.count ? response.count : 0
        const total = Math.ceil(count / limit);

        if (response.response?.status === 401) {
            setIsError(true)
        }

        setTipoGastos(response.rows);
        setTotalPages(total);
        setTotalRows(count)
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleFiltroChange = (e) => {
        setFiltro(e.target.value);
    };

    const handleDelete = async (tipoGastoId) => {
        await deleteTipoGasto(tipoGastoId, token);
        if (currentPage === 1) {
            loadTipoGastos(1, '', token);
        } else {
            setCurrentPage(1)
        }
    };

    useEffect(() => {
        loadTipoGastos(currentPage, filtro, token);
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
            <HeaderList title="Lista de tipo gasto" nav="Home / tipo gasto"></HeaderList>
            <div className='card-custom shadow-sm'>
                <div className='card-custom-header mb-3 col-12'>
                    <ButtonNew eventOnClick={() => navigate('/tipoGasto/create')}></ButtonNew>
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
                            {tipoGastos?.length > 0 && (tipoGastos.map((tipoGasto) => (
                                <tr key={tipoGasto.id}>
                                    <td>
                                        <ButtonAction eventDelete={() => handleDelete(tipoGasto.id)} eventUpdate={() => navigate(`/tipoGasto/update/${tipoGasto.id}`)}></ButtonAction>
                                    </td>
                                    <td>{tipoGasto.id} </td>
                                    <td><BadgeCustom texto={tipoGasto.descricao} corTexto={tipoGasto.corHexaDecimalFonte} corFundo={tipoGasto.corHexaDecimalFundo}></BadgeCustom></td>
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

export default TipoGastoList;