import React, { useState, useEffect, useContext } from 'react';
import { getProdutos, deleteProduto } from '../../services/produto';
import { useNavigate } from 'react-router-dom'
import HeaderList from '../custom/headerList'
import Pagination from '../custom/Pagination'
import ButtonAction from '../custom/buttonAction'
import ButtonSearch from '../custom/buttonSearch'
import ButtonNew from '../custom/buttonNew'
import StoreContext from '../context/Context';

const ProdutoList = () => {

    const navigate = useNavigate()
    const [produtos, setProdutos] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [filtro, setFiltro] = useState('');
    const [totalRows, setTotalRows] = useState(0);
    const [isError, setIsError] = useState(false)
    const { setToken, token } = useContext(StoreContext)

    const loadProdutos = async (page, filtro, token) => {

        const limit = 9;

        const offset = (page - 1) * limit;

        const response = await getProdutos(limit, offset, filtro, token)
        const count = response.count ? response.count : 0
        const total = Math.ceil(count / limit);

        if (response.response?.status === 401) {
            setIsError(true)
        }

        setProdutos(response.rows);
        setTotalPages(total);
        setTotalRows(count)
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleFiltroChange = (e) => {
        setFiltro(e.target.value);
    };

    const handleDelete = async (produtoId) => {
        await deleteProduto(produtoId, token);
        if (currentPage === 1) {
            loadProdutos(1, '', token);
        } else {
            setCurrentPage(1)
        }
    }

    useEffect(() => {
        loadProdutos(currentPage, filtro, token);
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
            <HeaderList title="Lista de produto" nav="Home / produto"></HeaderList>
            <div className='card-custom shadow-sm'>
                <div className='card-custom-header mb-3 col-12'>
                    <ButtonNew eventOnClick={() => navigate('/produto/create')}></ButtonNew>
                    <ButtonSearch eventOnChange={handleFiltroChange}></ButtonSearch>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Código</th>
                                <th>Descrição</th>
                                <th>Categoria</th>
                                <th>Valor venda</th>
                                <th>Custo compra</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtos?.length > 0 && (produtos.map((produto) => (
                                <tr key={produto.id}>
                                    <td>
                                        <ButtonAction eventDelete={() => handleDelete(produto.id)} eventUpdate={() => navigate(`/produto/update/${produto.id}`)}></ButtonAction>
                                    </td>
                                    <td>{produto.id} </td>
                                    <td>{produto.descricao}</td>
                                    <td>{produto.categoria.descricao}</td>
                                    <td>R$ {produto.valorVenda.replace('.', ',')}</td>
                                    <td>R$ {produto.custoCompra.replace('.', ',')}</td>
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

export default ProdutoList;