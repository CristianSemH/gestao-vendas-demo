import React, { useState, useEffect, useContext } from 'react'
import { getCategorias, deleteCategoria } from '../../services/categoria'
import { useNavigate } from 'react-router-dom'
import HeaderList from '../custom/headerList'
import Pagination from '../custom/Pagination'
import ButtonAction from '../custom/buttonAction'
import ButtonSearch from '../custom/buttonSearch'
import ButtonNew from '../custom/buttonNew'
import StoreContext from '../context/Context'

const CategoriaList = () => {

    const navigate = useNavigate()
    const [categorias, setCategorias] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [filtro, setFiltro] = useState('');
    const [totalRows, setTotalRows] = useState(0);
    const [isError, setIsError] = useState(false)
    const { setToken, token } = useContext(StoreContext)

    const loadCategorias = async (page, filtro, token) => {

        const limit = 9;

        const offset = (page - 1) * limit;

        const response = await getCategorias(limit, offset, filtro, token)
        const count = response.count ? response.count : 0
        const total = Math.ceil(count / limit);

        if (response.response?.status === 401) {
            setIsError(true)
        }

        setCategorias(response.rows);
        setTotalPages(total);
        setTotalRows(count)
    };

    const handleDelete = async (categoriaId) => {
        await deleteCategoria(categoriaId, token);
        if (currentPage === 1) {
            loadCategorias(1, '', token);
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
        loadCategorias(currentPage, filtro, token);
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
            <HeaderList title="Lista de categoria" nav="Home / categoria"></HeaderList>
            <div className='card-custom shadow-sm'>
                <div className='card-custom-header mb-3 col-12'>
                    <ButtonNew eventOnClick={() => navigate('/categoria/create')}></ButtonNew>
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
                            {categorias?.length > 0 && (categorias.map((categoria) => (
                                <tr key={categoria.id}>
                                    <td><ButtonAction eventDelete={() => handleDelete(categoria.id)} eventUpdate={() => navigate(`/categoria/update/${categoria.id}`)}></ButtonAction></td>
                                    <td>{categoria.id} </td>
                                    <td>{categoria.descricao}</td>

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

export default CategoriaList;