import React, { useState, useEffect, useContext } from 'react';
import { getUsers, deleteUser } from '../../services/usuario';
import { useNavigate } from 'react-router-dom'
import HeaderList from '../custom/headerList'
import Pagination from '../custom/Pagination'
import ButtonAction from '../custom/buttonAction'
import ButtonSearch from '../custom/buttonSearch'
import ButtonNew from '../custom/buttonNew'
import StoreContext from '../context/Context';


const UserList = () => {

    const navigate = useNavigate()

    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [filtro, setFiltro] = useState('');
    const [totalRows, setTotalRows] = useState(0);
    const [isError, setIsError] = useState(false)
    const { setToken, token } = useContext(StoreContext)


    const loadUsers = async (page, filtro, token) => {

        const limit = 9;

        const offset = (page - 1) * limit;

        const response = await getUsers(limit, offset, filtro, token)
        const count = response.count ? response.count : 0
        const total = Math.ceil(count / limit);

        if (response.response?.status === 401) {
            setIsError(true)
        }

        setUsers(response.rows);
        setTotalPages(total);
        setTotalRows(count)
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleFiltroChange = (e) => {
        setFiltro(e.target.value);
    };

    const handleDelete = async (userId) => {
        await deleteUser(userId, token);
        if (currentPage === 1) {
            loadUsers(1, '', token);
        } else {
            setCurrentPage(1)
        }
    };

    useEffect(() => {
        loadUsers(currentPage, filtro, token);
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
            <HeaderList title="Lista de usuário" nav="Home / usuário"></HeaderList>
            <div className='card-custom shadow-sm'>
                <div className='card-custom-header mb-3 col-12'>
                    <ButtonNew eventOnClick={() => navigate('/usuario/create')}></ButtonNew>
                    <ButtonSearch eventOnChange={handleFiltroChange}></ButtonSearch>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Código</th>
                                <th>Usuário</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.map((user) => (
                                <tr key={user.id}>
                                    <td>
                                        <ButtonAction eventDelete={() => handleDelete(user.id)} eventUpdate={() => navigate(`/usuario/update/${user.id}`)}></ButtonAction>
                                    </td>
                                    <td>{user.id} </td>
                                    <td>{user.usuario}</td>
                                </tr>
                            ))}
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

export default UserList;