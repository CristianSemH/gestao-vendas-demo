import React, { useEffect, useState, useContext, useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import { useForm, Controller } from 'react-hook-form';
import { getProdutosById, addProduto, updateProduto } from '../../services/produto';
import { getCategorias } from '../../services/categoria';
import { useParams, useNavigate } from 'react-router-dom'
import Alert from '../../components/custom/alert';
import Select from 'react-select';
import InputNumber from '../custom/inputNumber';
import StoreContext from '../context/Context';

const InputForm = () => {

    const [MesssagesError, setMesssagesError] = useState([])
    const [CategoriasOption, setCategoriasOption] = useState([])
    const [valorVenda, setValorVenda] = useState(0);
    const [custoCompra, setCustoCompra] = useState(0);
    const [isError, setIsError] = useState(false)
    const { setToken, token } = useContext(StoreContext)
    const navigate = useNavigate()
    const { id } = useParams();
    const { register, handleSubmit, reset, control, setValue } = useForm()

    const formatInputNumber = useCallback((valor) => {
        const inputNumber = parseFloat(String(valor).replace(/[^0-9]/g, ''));

        return !isNaN(inputNumber) ? (inputNumber / 100).toFixed(2) : 0
    },
        []
    );

    async function getDataUpdate(id, reset, formatInputNumber, token) {
        if (id) {
            const result = await getProdutosById(id, token)

            if (result.response?.status === 401) {
                setIsError(true)
            }

            if (result) {
                setValorVenda(formatInputNumber(result.valorVenda))
                setCustoCompra(formatInputNumber(result.custoCompra))
                reset(result)
            }
        }
    }

    async function getListCategorias(token) {
        await getCategorias(0, 0, '', token).then((categorias) => {
            setCategoriasOption(categorias.rows.map(categoria => {
                return {
                    value: categoria.id,
                    label: categoria.descricao
                }
            }))
        }).catch(err => {
            console.log(err)
        });
    }

    const handleUpdateCreate = async (produto) => {

        setMesssagesError([])

        if (id) {
            const result = await updateProduto(id, produto, token)

            if (result.response?.status === 401) {
                setIsError(true)
            }

            if (result.code) {
                if (result.code === 'ERR_BAD_REQUEST') {
                    setMesssagesError(result.response.data)
                }
            } else {
                navigate('/produto')
            }

        } else {
            const result = await addProduto(produto, token)

            if (result.response?.status === 401) {
                setIsError(true)
            }

            if (result.code) {
                if (result.code === 'ERR_BAD_REQUEST') {
                    setMesssagesError(result.response.data)
                }
            } else {
                navigate('/produto')
            }
        }
    };

    useEffect(() => {
        getListCategorias(token)
        getDataUpdate(id, reset, formatInputNumber, token)
    }, [id, reset, formatInputNumber, token]);

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
                                    <Form.Group className="mb-3" controlId="formProduto">
                                        <Form.Label>Descrição</Form.Label>
                                        <Form.Control type="text" {...register("descricao")} />
                                    </Form.Group>
                                </div>
                                <div className="col-md-4">
                                    <Form.Label>Categoria</Form.Label>
                                    <Controller
                                        name="idCategoria"
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <Select
                                                options={CategoriasOption}
                                                value={CategoriasOption.find((c) => c.value === value)}
                                                onChange={(val) => onChange(val.value)}
                                            />
                                        )}
                                    />
                                </div>

                                <div className="col-md-4">
                                    <InputNumber valueForm={valorVenda} label="Valor venda" setValueForm={setValue} setValue={setValorVenda} name="valorVenda"></InputNumber>
                                </div>


                                <div className="col-md-4">
                                    <InputNumber valueForm={custoCompra} label="Custo compra" setValueForm={setValue} setValue={setCustoCompra} name="custoCompra"></InputNumber>
                                </div>

                            </div>
                            <div className="col-12">
                                <button className='button-custom button-custom-primary' type="submit">
                                    Salvar
                                </button>
                                <div className='float-end'>
                                    <button className='button-custom button-custom-secondary' onClick={() => navigate('/produto')}> Voltar</button>
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