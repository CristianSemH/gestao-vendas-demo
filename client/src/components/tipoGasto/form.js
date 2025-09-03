import React, { useEffect, useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { getTipoGastosById, addTipoGasto, updateTipoGasto } from '../../services/tipoGasto';
import { useParams, useNavigate } from 'react-router-dom'
import Alert from '../../components/custom/alert';
import BadgeCustom from '../custom/badge'
import StoreContext from '../context/Context';

const InputForm = () => {

    const [MesssagesError, setMesssagesError] = useState([])
    const [corFundo, setCorFundo] = useState('#000000')
    const [corTexto, setCorTexto] = useState('#000000')
    const [descricao, setDescricao] = useState('')
    const navigate = useNavigate()
    const { id } = useParams();
    const { register, handleSubmit, reset } = useForm()
    const [isError, setIsError] = useState(false)
    const { setToken, token } = useContext(StoreContext)

    async function getDataUpdate(id, reset, token) {
        if (id) {
            const result = await getTipoGastosById(id, token)

            if (result.response?.status === 401) {
                setIsError(true)
            }

            if (result) {
                setCorFundo(result.corHexaDecimalFundo)
                setCorTexto(result.corHexaDecimalFonte)
                setDescricao(result.descricao)
                reset(result)
            }
        }
    }

    const handleUpdateCreate = async (tipoGasto) => {

        setMesssagesError([])

        if (id) {
            const result = await updateTipoGasto(id, tipoGasto, token)

            if (result.response?.status === 401) {
                setIsError(true)
            }

            if (result.code) {
                if (result.code === 'ERR_BAD_REQUEST') {
                    setMesssagesError(result.response.data)
                }
            } else {
                navigate('/tipoGasto')
            }
        } else {
            const result = await addTipoGasto(tipoGasto, token)

            if (result.response?.status === 401) {
                setIsError(true)
            }

            if (result.code) {
                if (result.code === 'ERR_BAD_REQUEST') {
                    setMesssagesError(result.response.data)
                }
            } else {
                navigate('/tipoGasto')
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
                                    <Form.Group className="mb-3" controlId="formTipoGasto">
                                        <Form.Label>Descrição</Form.Label>
                                        <Form.Control type="text" {...register("descricao")} onChange={e => { setDescricao(e.target.value) }} />
                                    </Form.Group>
                                </div>
                                <div className="col-md-4">
                                    <Form.Group className="mb-3" controlId="formTipoGasto">
                                        <Form.Label>Cor de fundo</Form.Label>
                                        <Form.Control type="color" {...register("corHexaDecimalFundo")} onChange={e => { setCorFundo(e.target.value) }} />
                                    </Form.Group>
                                </div>
                                <div className="col-md-4">
                                    <Form.Group className="mb-3" controlId="formTipoGasto">
                                        <Form.Label>Cor de fonte</Form.Label>
                                        <Form.Control type="color" {...register("corHexaDecimalFonte")} onChange={e => { setCorTexto(e.target.value) }} />
                                    </Form.Group>
                                </div>
                                <div className="col-md-4">
                                    <Form.Label>Visualização</Form.Label>
                                    <div className='col-12'>
                                        <BadgeCustom texto={descricao} corTexto={corTexto} corFundo={corFundo}></BadgeCustom>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 mt-5">
                                <button className='button-custom button-custom-primary' type="submit">
                                    Salvar
                                </button>
                                <div className='float-end'>
                                    <button className='button-custom button-custom-secondary' onClick={() => navigate('/tipogasto')}> Voltar</button>
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