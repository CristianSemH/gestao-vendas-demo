import React, { useState, useEffect, useContext } from 'react';
import { getTipoSituacaos, deleteTipoSituacao } from '../../services/tipoSituacaoDespesa';
import { useNavigate } from 'react-router-dom'
import HeaderList from '../custom/headerList'
import BadgeCustom from '../custom/badge'
import Pagination from '../custom/Pagination'
import ButtonAction from '../custom/buttonAction'
import ButtonSearch from '../custom/buttonSearch'
import ButtonNew from '../custom/buttonNew'
import StoreContext from '../context/Context';

const TipoSituacaoList = () => {

    const navigate = useNavigate()

    const [tipoSituacaos, setTipoSituacaos] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [filtro, setFiltro] = useState('');
    const [totalRows, setTotalRows] = useState(0);
    const [isError, setIsError] = useState(false)
    const { setToken, token } = useContext(StoreContext)

    const loadTipoSituacaos = async (page, filtro, token) => {

        const limit = 9;

        const offset = (page - 1) * limit;

        const response = await getTipoSituacaos(limit, offset, filtro, token)
        const count = response.count ? response.count : 0
        const total = Math.ceil(count / limit);

        if (response.response?.status === 401) {
            setIsError(true)
        }

        setTipoSituacaos(response.rows);
        setTotalPages(total);
        setTotalRows(count)
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleFiltroChange = (e) => {
        setFiltro(e.target.value);
    };

    const handleDelete = async (tipoSituacaoId) => {
        await deleteTipoSituacao(tipoSituacaoId);
        if (currentPage === 1) {
            loadTipoSituacaos(1, '', token);
        } else {
            setCurrentPage(1)
        }
    };

    useEffect(() => {
        loadTipoSituacaos(currentPage, filtro, token);
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
            <HeaderList title="Lista de tipo situação despesa" nav="Home / tipo situação despesa"></HeaderList>
            <div className='card-custom shadow-sm'>
                <div className='card-custom-header mb-3 col-12'>
                    <ButtonNew eventOnClick={() => navigate('/tiposituacaodespesa/create')}></ButtonNew>
                    <ButtonSearch eventOnChange={handleFiltroChange}></ButtonSearch>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Código</th>
                                <th>Descrição</th>
                                <th>Base situação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tipoSituacaos?.length > 0 && (tipoSituacaos.map((tipoSituacao) => (
                                <tr key={tipoSituacao.id}>
                                    <td>
                                        <ButtonAction eventDelete={() => handleDelete(tipoSituacao.id)} eventUpdate={() => navigate(`/tipoSituacaodespesa/update/${tipoSituacao.id}`)}></ButtonAction>
                                    </td>
                                    <td>{tipoSituacao.id} </td>
                                    <td><BadgeCustom texto={tipoSituacao.descricao} corTexto={tipoSituacao.corHexaDecimalFonte} corFundo={tipoSituacao.corHexaDecimalFundo}></BadgeCustom></td>
                                    <td>{tipoSituacao.baseSituacao}</td>
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

export default TipoSituacaoList;