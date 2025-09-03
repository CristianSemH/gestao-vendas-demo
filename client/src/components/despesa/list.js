import React, { useState, useEffect, useContext } from 'react';
import { getDespesas, deleteDespesa } from '../../services/despesa';
import { useNavigate } from 'react-router-dom'
import HeaderList from '../custom/headerList'
import BadgeCustom from '../custom/badge'
import Moment from 'react-moment'
import Pagination from '../custom/Pagination'
import ButtonAction from '../custom/buttonAction'
import ButtonSearch from '../custom/buttonSearch'
import ButtonNew from '../custom/buttonNew'
import StoreContext from '../context/Context';

const DespesaList = () => {

    const navigate = useNavigate()

    const [despesas, setDespesas] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [filtro, setFiltro] = useState('');
    const [totalRows, setTotalRows] = useState(0);
    const [isError, setIsError] = useState(false)
    const { setToken, token } = useContext(StoreContext)

    const loadDespesas = async (page, filtro, token) => {

        const limit = 9;

        const offset = (page - 1) * limit;

        const response = await getDespesas(limit, offset, filtro, token)
        const count = response.count ? response.count : 0
        const total = Math.ceil(count / limit);

        if (response.response?.status === 401) {
            setIsError(true)
        }

        setDespesas(response.rows);
        setTotalPages(total);
        setTotalRows(count)
    };


    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleFiltroChange = (e) => {
        setFiltro(e.target.value);
    };

    const handleDelete = async (despesaId) => {
        await deleteDespesa(despesaId, token);
        if (currentPage === 1) {
            loadDespesas(1, '', token);
        } else {
            setCurrentPage(1)
        }
    };

    useEffect(() => {
        loadDespesas(currentPage, filtro, token);
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
            <HeaderList title="Lista de despesa" nav="Home / despesa"></HeaderList>
            <div className='card-custom shadow-sm'>
                <div className='card-custom-header mb-3 col-12'>
                    <ButtonNew eventOnClick={() => navigate('/despesa/create')}></ButtonNew>
                    <ButtonSearch eventOnChange={handleFiltroChange}></ButtonSearch>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Código</th>
                                <th>Descrição</th>
                                <th>Abertura</th>
                                <th>Pagamento</th>
                                <th>Forma pagamento</th>
                                <th>Total</th>
                                <th>Situação</th>
                                <th>Tipo gasto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {despesas?.length > 0 && (despesas.map((despesa) => (
                                <tr key={despesa.id}>
                                    <td><ButtonAction eventDelete={() => handleDelete(despesa.id)} eventUpdate={() => navigate(`/despesa/update/${despesa.id}`)}></ButtonAction></td>
                                    <td>{despesa.id} </td>
                                    <td>{despesa.descricao}</td>
                                    <td><Moment format="DD/MM/YYYY" date={despesa.dataAbertura}></Moment></td>
                                    <td><Moment format="DD/MM/YYYY" date={despesa.dataPagamento}></Moment></td>
                                    <td>{despesa.FormaPagamento.descricao}</td>
                                    <td>R$ {parseFloat(despesa.valorTotal).toFixed(2).toString().replace('.', ',')}</td>
                                    <td><BadgeCustom texto={despesa.TipoSituacao.descricao} corTexto={despesa.TipoSituacao.corHexaDecimalFonte} corFundo={despesa.TipoSituacao.corHexaDecimalFundo}></BadgeCustom></td>
                                    <td><BadgeCustom texto={despesa.TipoGasto.descricao} corTexto={despesa.TipoGasto.corHexaDecimalFonte} corFundo={despesa.TipoGasto.corHexaDecimalFundo}></BadgeCustom></td>
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

export default DespesaList;