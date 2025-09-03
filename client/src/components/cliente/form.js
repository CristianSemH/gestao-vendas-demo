import React, { useEffect, useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { useForm, Controller, useFieldArray, FormProvider, useWatch } from 'react-hook-form';
import { getClienteenderecosById, addClienteendereco, updateClienteendereco } from '../../services/clienteendereco';
import { useParams, useNavigate } from 'react-router-dom'
import Alert from '../../components/custom/alert';
import { useMask } from '@react-input/mask';
import FormEndereco from './formEndereco'
import StoreContext from '../context/Context';

const InputForm = () => {

    const [isError, setIsError] = useState(false)
    const { setToken, token } = useContext(StoreContext)
    const [MesssagesError, setMesssagesError] = useState([])
    const [TipoPessoa, setTipoPessoa] = useState('F')
    const inputRefFone = useMask({ mask: '(__)_____-____', replacement: { _: /\d/ } });
    const inputRefCPF = useMask({ mask: '___.___.___-__', replacement: { _: /\d/ } });
    const inputRefCNPJ = useMask({ mask: '__.___.___/____-__', replacement: { _: /\d/ } });
    const { id } = useParams();
    const methods = useForm()
    const navigate = useNavigate()
    const { fields, append, remove } = useFieldArray({
        control: methods.control,
        name: "Enderecos"
    });
    const Enderecos = useWatch({
        name: "Enderecos",
        control: methods.control
    });

    async function getDataUpdate(id, token, reset) {
        if (id) {
            const result = await getClienteenderecosById(id, token)

            if (result.response?.status === 401) {
                setIsError(true)
            }

            if (result) {
                setTipoPessoa(result.TipoPessoa)
                reset(result)
            }
        }
    }

    const handleUpdateCreate = async (cliente) => {

        setMesssagesError([])

        if (validateDefaultEndereco(cliente.Enderecos) === 0) {
            setMesssagesError([{ message: "Marque pelo menos um endereço como padrão" }])
        } else {
            if (validateDefaultEndereco(cliente.Enderecos) > 1) {
                setMesssagesError([{ message: "Mais de um endereço marcado como padrão" }])
            } else {
                if (id) {
                    const result = await updateClienteendereco(id, cliente, token)

                    if (result.response?.status === 401) {
                        setIsError(true)
                    }

                    if (result.code) {
                        if (result.code === 'ERR_BAD_REQUEST') {
                            setMesssagesError(result.response.data)
                        }
                    } else {
                        navigate('/cliente')
                    }
                } else {
                    const result = await addClienteendereco(cliente, token);

                    if (result.response?.status === 401) {
                        setIsError(true)
                    }

                    if (result.code) {
                        if (result.code === 'ERR_BAD_REQUEST') {
                            setMesssagesError(result.response.data)
                        }
                    } else {
                        navigate('/cliente')
                    }
                }
            }
        }
    };

    useEffect(() => {
        getDataUpdate(id, token, methods.reset)
    }, [id, token, methods.reset]);

    useEffect(() => {
        function ReturnLogin() {
            setToken(null)
            navigate('/login')
        }

        if (isError) {
            ReturnLogin()
        }
    }, [isError, navigate, setToken]);

    function validateDefaultEndereco(Enderecos) {
        return Enderecos?.reduce((isDefault, item) => isDefault + (item.EnderecoPadrao ? 1 : 0), 0) || 0
    }

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
                        <FormProvider {...methods}>
                            <Form onSubmit={methods.handleSubmit(handleUpdateCreate)}>
                                <div className="row">
                                    <div className="col-md-4">
                                        <Form.Group className="mb-3" controlId="formNome">
                                            <Form.Label>Nome</Form.Label>
                                            <Form.Control type="text" {...methods.register("nome")} />
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-4">
                                        <Form.Group className="mb-3" controlId="FormTipo">
                                            <Form.Label>Tipo pessoa</Form.Label>
                                            <Form.Select {...methods.register("TipoPessoa")} onChange={e => { setTipoPessoa(e.target.value) }}>
                                                <option value="F">Física</option>
                                                <option value="J">Jurídico</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-4">
                                        <Form.Group className="mb-3" controlId="FormCelular">
                                            <Form.Label>Celular</Form.Label>
                                            <Controller
                                                name="celular"
                                                control={methods.control}
                                                render={({ field: { onChange, value } }) => (
                                                    <Form.Control
                                                        ref={inputRefFone}
                                                        type="text"
                                                        value={value || ''}
                                                        onChange={onChange}
                                                    />
                                                )}
                                            />

                                        </Form.Group>
                                    </div>

                                    <div className={TipoPessoa === 'J' ? 'col-md-4' : 'col-md-4 d-none'}>
                                        <Form.Group className="mb-3" controlId="FormCNPJ">
                                            <Form.Label>CNPJ</Form.Label>
                                            <Controller
                                                name="cnpj"
                                                control={methods.control}
                                                render={({ field: { onChange, value } }) => (
                                                    <Form.Control
                                                        type="text"
                                                        ref={inputRefCNPJ}
                                                        onChange={onChange}
                                                        value={value || ''}
                                                    />
                                                )}
                                            />
                                        </Form.Group>
                                    </div>

                                    <div className={TipoPessoa === 'F' ? 'col-md-4' : 'col-md-4 d-none'}>
                                        <Form.Group className="mb-3" controlId="FormCPF">
                                            <Form.Label>CPF</Form.Label>
                                            <Controller
                                                name="cpf"
                                                control={methods.control}
                                                render={({ field: { onChange, value } }) => (
                                                    <Form.Control
                                                        type="text"
                                                        ref={inputRefCPF}
                                                        onChange={onChange}
                                                        value={value || ''}
                                                    />
                                                )}
                                            />
                                        </Form.Group>
                                    </div>

                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <h5>Endereços</h5>
                                                            </div>
                                                            <div className="col-6">
                                                                <div className="float-end">
                                                                    <button className="button-custom-action button-custom-create" type="button" onClick={() => {
                                                                        append({
                                                                            id: '',
                                                                            idTipoEndereco: 0,
                                                                            EnderecoPadrao: false,
                                                                            cep: '',
                                                                            logradouro: '',
                                                                            numero: 0,
                                                                            bairro: '',
                                                                            complemento: '',
                                                                            referencia: '',
                                                                            IdCidade: 0,
                                                                            idCliente: 0
                                                                        })
                                                                    }}> <ion-icon name="add-outline"></ion-icon> </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {fields.map((field, index) => (
                                                        <FormEndereco key={field.id}
                                                            index={index}
                                                            field={field}
                                                            remove={remove}
                                                            register={methods.register}
                                                            Enderecos={Enderecos}
                                                            setValue={methods.setValue}
                                                            getValues={methods.getValues}
                                                            watch={methods.watch}
                                                            setToken={setToken}
                                                            token={token}></FormEndereco>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-12 mt-4">
                                    <button className='button-custom button-custom-primary' type="submit">
                                        Salvar
                                    </button>
                                    <div className='float-end'>
                                        <button className='button-custom button-custom-secondary' onClick={() => navigate('/cliente')}> Voltar</button>
                                    </div>
                                </div>
                            </Form>
                        </FormProvider>
                    </div >
                </div>
            </div >
        </div >
    );
};

export default InputForm;