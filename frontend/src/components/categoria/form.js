import React, { useEffect, useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { getCategoriasById, addCategoria, updateCategoria } from '../../services/categoria';
import { useParams, useNavigate } from 'react-router-dom'
import Alert from '../../components/custom/alert';
import StoreContext from '../context/Context';

const InputForm = () => {

    const [MesssagesError, setMesssagesError] = useState([])
    const [isError, setIsError] = useState(false)
    const { setToken, token } = useContext(StoreContext)
    const navigate = useNavigate()
    const { id } = useParams();
    const { register, handleSubmit, reset } = useForm()

    async function getDataUpdate(id, reset, token) {
        if (id) {
            const result = await getCategoriasById(id, token)

            if (result.response?.status === 401) {
                setIsError(true)
            }
            if (result) {
                reset(result)
            }
        }
    }

    const handleUpdateCreate = async (categoria) => {

        setMesssagesError([])

        if (id) {
            const result = await updateCategoria(id, categoria, token);

            if (result.response?.status === 401) {
                setIsError(true)
            }

            if (result.code) {
                if (result.code === 'ERR_BAD_REQUEST') {
                    setMesssagesError(result.response.data)
                }
            } else {
                navigate('/categoria')
            }
        } else {
            const result = await addCategoria(categoria, token);

            if (result.response?.status === 401) {
                setIsError(true)
            }

            if (result.code) {
                if (result.code === 'ERR_BAD_REQUEST') {
                    setMesssagesError(result.response.data)
                }
            } else {
                navigate('/categoria')
            }
        }
    };

    useEffect(() => {
        getDataUpdate(id, reset, token)
    }, [id, reset, token]);

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
            <div className='card-custom shadow-sm'>
                <div className='row'>
                    <div className='card-custom-header mb-3 col-12'>

                        <div className="position-absolute end-0 top-0 m-2">
                            {MesssagesError.length > 0 && (MesssagesError.map((e, index) => {
                                return <Alert key={index} TitleAlert="" MessageAlert={e.message}></Alert>
                            }))
                            }
                        </div>
                        <Form onSubmit={handleSubmit(handleUpdateCreate)}>
                            <div className="row">
                                <div className="col-md-12">
                                    <Form.Group className="mb-3" controlId="formCategoria">
                                        <Form.Label>Descrição</Form.Label>
                                        <Form.Control type="text" {...register("descricao")} />
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="col-12">
                                <button className='button-custom button-custom-primary' type="submit">
                                    Salvar
                                </button>
                                <div className='float-end'>
                                    <button className='button-custom button-custom-secondary' onClick={() => navigate('/categoria')}> Voltar</button>
                                </div>
                            </div>
                        </Form>

                    </div >
                </div>
            </div>
        </div>
    );
};

export default InputForm;