import React, { useState, useEffect, useContext } from 'react';
import { getFormaPagamentos, deleteFormaPagamento } from '../../services/formaPagamento';
import { useNavigate } from 'react-router-dom'
import HeaderList from '../custom/headerList'
import Pagination from '../custom/Pagination'
import ButtonAction from '../custom/buttonAction'
import ButtonSearch from '../custom/buttonSearch'
import ButtonNew from '../custom/buttonNew'
import StoreContext from '../context/Context';

const FormaPagamentoList = () => {

    const navigate = useNavigate()

    const [formaPagamentos, setFormaPagamentos] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [filtro, setFiltro] = useState('');
    const [totalRows, setTotalRows] = useState(0);
    const [isError, setIsError] = useState(false)
    const { setToken, token } = useContext(StoreContext)

    const loadFormaPagamentos = async (page, filtro, token) => {

        const limit = 9;

        const offset = (page - 1) * limit;

        const response = await getFormaPagamentos(limit, offset, filtro, token)
        const count = response.count ? response.count : 0
        const total = Math.ceil(count / limit);

        if (response.response?.status === 401) {
            setIsError(true)
        }

        setFormaPagamentos(response.rows);
        setTotalPages(total);
        setTotalRows(count)
    };


    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleFiltroChange = (e) => {
        setFiltro(e.target.value);
    };

    const handleDelete = async (formaPagamentoId) => {
        await deleteFormaPagamento(formaPagamentoId, token);
        if (currentPage === 1) {
            loadFormaPagamentos(1, '', token);
        } else {
            setCurrentPage(1)
        }
    };

    useEffect(() => {
        loadFormaPagamentos(currentPage, filtro, token);
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
            <HeaderList title="Lista de forma pagamento" nav="Home / forma pagamento"></HeaderList>
            <div className='card-custom shadow-sm'>
                <div className='card-custom-header mb-3 col-12'>
                    <ButtonNew eventOnClick={() => navigate('/formaPagamento/create')}></ButtonNew>
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
                            {formaPagamentos?.length > 0 && (formaPagamentos.map((formaPagamento) => (
                                <tr key={formaPagamento.id}>
                                    <td>
                                        <ButtonAction eventDelete={() => handleDelete(formaPagamento.id)} eventUpdate={() => navigate(`/formaPagamento/update/${formaPagamento.id}`)}></ButtonAction>
                                    </td>
                                    <td>{formaPagamento.id} </td>
                                    <td>{formaPagamento.descricao}</td>
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

export default FormaPagamentoList;