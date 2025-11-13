import React, { useEffect, useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { getTipoEnderecosById, addTipoEndereco, updateTipoEndereco } from '../../services/tipoEndereco';
import { useParams, useNavigate } from 'react-router-dom'
import Alert from '../../components/custom/alert';
import StoreContext from '../context/Context';

const InputForm = () => {

    const [MesssagesError, setMesssagesError] = useState([])
    const navigate = useNavigate()
    const { id } = useParams();
    const { register, handleSubmit, reset } = useForm()
    const [isError, setIsError] = useState(false)
    const { setToken, token } = useContext(StoreContext)

    async function getDataUpdate(id, reset, token) {
        if (id) {
            const result = await getTipoEnderecosById(id, token)

            if (result.response?.status === 401) {
                setIsError(true)
            }

            if (result) {
                reset(result)
            }
        }
    }

    const handleUpdateCreate = async (tipoEndereco) => {

        setMesssagesError([])

        if (id) {
            const result = await updateTipoEndereco(id, tipoEndereco, token)

            if (result.response?.status === 401) {
                setIsError(true)
            }

            if (result.code) {
                if (result.code === 'ERR_BAD_REQUEST') {
                    setMesssagesError(result.response.data)
                }
            } else {
                navigate('/tipoEndereco')
            }

        } else {
            const result = await addTipoEndereco(tipoEndereco, token)

            if (result.response?.status === 401) {
                setIsError(true)
            }

            if (result.code) {
                if (result.code === 'ERR_BAD_REQUEST') {
                    setMesssagesError(result.response.data)
                }
            } else {
                navigate('/tipoEndereco')
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
                                    <Form.Group className="mb-3" controlId="formTipoEndereco">
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
                                    <button className='button-custom button-custom-secondary' onClick={() => navigate('/tipoendereco')}> Voltar</button>
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