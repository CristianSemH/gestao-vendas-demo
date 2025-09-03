import React, { useEffect, useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { getTipoSituacaosById, addTipoSituacao, updateTipoSituacao } from '../../services/tipoSituacaoDespesa';
import { useParams, useNavigate } from 'react-router-dom'
import Alert from '../custom/alert';
import BadgeCustom from '../custom/badge'
import StoreContext from '../context/Context';

const InputForm = () => {

    const [MesssagesError, setMesssagesError] = useState([])
    const [corFundo, setCorFundo] = useState('#000000')
    const [corTexto, setCorTexto] = useState('#000000')
    const [descricao, setDescricao] = useState('')
    const [isError, setIsError] = useState(false)
    const { setToken, token } = useContext(StoreContext)

    const navigate = useNavigate()

    const { id } = useParams();

    const { register, handleSubmit, reset } = useForm()

    async function getDataUpdate(id, reset, token) {
        if (id) {
            const result = await getTipoSituacaosById(id, token)

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

    const handleUpdateCreate = async (tipoSituacao) => {

        setMesssagesError([])

        if (id) {
            const result = await updateTipoSituacao(id, tipoSituacao, token)

            if (result.response?.status === 401) {
                setIsError(true)
            }

            if (result.code) {
                if (result.code === 'ERR_BAD_REQUEST') {
                    setMesssagesError(result.response.data)
                }
            } else {
                navigate('/tiposituacaodespesa')
            }

        } else {
            const result = await addTipoSituacao(tipoSituacao, token)

            if (result.response?.status === 401) {
                setIsError(true)
            }

            if (result.code) {
                if (result.code === 'ERR_BAD_REQUEST') {
                    setMesssagesError(result.response.data)
                }
            } else {
                navigate('/tiposituacaodespesa')
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
                                <div className="col-md-4">
                                    <Form.Group className="mb-3" controlId="formTipoSituacao">
                                        <Form.Label>Descrição</Form.Label>
                                        <Form.Control type="text" {...register("descricao")} onChange={e => { setDescricao(e.target.value) }} />
                                    </Form.Group>
                                </div>
                                <Form.Control type="hidden" value="V" {...register("tipo")} />
                                <div className="col-md-4">
                                    <Form.Group className="mb-3" controlId="formTipoSituacao">
                                        <Form.Label>Base situação</Form.Label>
                                        <Form.Select {...register("baseSituacao")}>
                                            <option value="Pendente">Pendente</option>
                                            <option value="Finalizado">Finalizado</option>
                                            <option value="Em Aberto">Em aberto</option>
                                            <option value="Cancelado">Cancelado</option>
                                            <option value="Pago">Pago</option>
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                                <div className="col-md-4">
                                    <Form.Group className="mb-3" controlId="formTipoSituacao">
                                        <Form.Label>Cor de fundo</Form.Label>
                                        <Form.Control type="color" {...register("corHexaDecimalFundo")} onChange={e => { setCorFundo(e.target.value) }} />
                                    </Form.Group>
                                </div>
                                <div className="col-md-4">
                                    <Form.Group className="mb-3" controlId="formTipoSituacao">
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
                                    <button className='button-custom button-custom-secondary' onClick={() => navigate('/tiposituacaodespesa')}> Voltar</button>
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