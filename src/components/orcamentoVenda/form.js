import React, { useEffect, useState, useContext, useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import { useForm, Controller, useFieldArray, FormProvider, useWatch } from 'react-hook-form';
import { getOrcamentoVendasById, addOrcamentoVenda, updateOrcamentoVenda } from '../../services/orcamentoVenda';
import { getClientes } from '../../services/cliente';
import { getFormaPagamentos } from '../../services/formaPagamento';
import { getTipoSituacaos } from '../../services/tipoSituacaoVenda';
import { getEnderecosForCliente } from '../../services/endereco';
import { useParams, useNavigate } from 'react-router-dom';
import Alert from '../../components/custom/alert';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import FormItem from './formItem'
import DatePicker, { registerLocale } from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import pt from 'date-fns/locale/pt';
import Select from 'react-select';
import InputNumber from '../custom/inputNumber';
import StoreContext from '../context/Context';

const InputForm = () => {

    registerLocale("pt", pt);
    const methods = useForm()
    const [MesssagesError, setMesssagesError] = useState([])
    const [TipoSituacaoVendasOption, setTipoSituacaoVendasOption] = useState([])
    const [ClientesOption, setClientesOption] = useState([])
    const [FormaPagamentosOption, setFormaPagamentosOption] = useState([])
    const [EnderecosOption, setEnderecosOption] = useState([])
    const [dataAbertura, setDataAbertura] = useState(new Date());
    const [dataVenda, setDataVenda] = useState(new Date());
    const [desconto, setDesconto] = useState(0);
    const [frete, setFrete] = useState(0);
    const [total, setTotal] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [idCliente, setIdCliente] = useState(0);
    const [isError, setIsError] = useState(false)
    const { setToken, token } = useContext(StoreContext)
    const navigate = useNavigate()
    const { id } = useParams();
    const { fields, append, remove } = useFieldArray({
        control: methods.control,
        name: "OrcamentoVendaItems"
    })

    const formatInputNumber = useCallback((valor) => {
        const inputNumber = parseFloat(String(valor).replace(/[^0-9]/g, ''));

        return !isNaN(inputNumber) ? (inputNumber / 100).toFixed(2) : 0
    },
        []
    );

    const OrcamentoVendaItems = useWatch({
        name: "OrcamentoVendaItems",
        control: methods.control
    });



    async function getDataUpdate(id, reset, setValue, formatInputNumber, token) {
        if (id) {
            const result = await getOrcamentoVendasById(id, token);

            if (result.response?.status === 401) {
                setIsError(true)
            }

            if (result) {
                setDataAbertura(new Date(result.dataAbertura + 'T12:00:00'));
                setDataVenda(result.dataVenda ? new Date(result.dataVenda + 'T12:00:00') : null);
                setFrete(formatInputNumber(result.frete))
                setDesconto(formatInputNumber(result.desconto))
                setIdCliente(result.idCliente)
                reset(result)
            }
        } else {
            setDataAbertura(new Date());
            setDataVenda(null);
            setValue('dataAbertura', new Date());
            setValue('dataVenda', null);
        }
    }

    async function getListTipoSituacaoVendas(token) {
        await getTipoSituacaos(0, 0, '', token).then((tipoSituacaoVendas) => {
            setTipoSituacaoVendasOption(tipoSituacaoVendas.rows.map(tipoSituacaoVenda => {
                return {
                    value: tipoSituacaoVenda.id,
                    label: tipoSituacaoVenda.descricao
                }
            }))
        }).catch(err => {
            console.log(err)
        });
    }

    async function getListClientes(token) {
        await getClientes(0, 0, '', token).then((clientes) => {
            setClientesOption(clientes.rows.map(cliente => {
                return {
                    value: cliente.id,
                    label: cliente.id + '- ' + cliente.nome
                }
            }))
        }).catch(err => {
            console.log(err)
        });
    }

    async function getListEnderecos(idCliente, token, setValue) {
        await getEnderecosForCliente(idCliente, token).then((enderecos) => {
            if (enderecos.length > 0) {
                setEnderecosOption(enderecos.map(endereco => {
                    return {
                        value: endereco.id,
                        label: endereco.logradouro
                    }
                }))
            } else {
                setEnderecosOption([])
            }

            const enderecoDefault = enderecos.filter((value) => value.EnderecoPadrao === true)

            if (enderecoDefault.length === 1) {
                setValue('idClienteEndereco', enderecoDefault[0].id)
            }

        }).catch(err => {
            console.log(err)
        });

    }

    async function getListFormaPagamentos(token) {
        await getFormaPagamentos(0, 0, '', token).then((formaPagamentos) => {
            setFormaPagamentosOption(formaPagamentos.rows.map(formaPagamento => {
                return {
                    value: formaPagamento.id,
                    label: formaPagamento.descricao
                }
            }))
        }).catch(err => {
            console.log(err)
        });
    }

    const handleUpdateCreate = async (orcamentoVenda) => {

        setMesssagesError([])

        if (id) {
            const result = await updateOrcamentoVenda(id, orcamentoVenda, token)

            if (result.response?.status === 401) {
                setIsError(true)
            }

            if (result.code) {
                if (result.code === 'ERR_BAD_REQUEST') {
                    setMesssagesError(result.response.data)
                }
            } else {
                navigate('/orcamentoVenda')
            }

        } else {
            const result = await addOrcamentoVenda(orcamentoVenda, token)

            if (result.response?.status === 401) {
                setIsError(true)
            }

            if (result.code) {
                if (result.code === 'ERR_BAD_REQUEST') {
                    setMesssagesError(result.response.data)
                }
            } else {
                navigate('/orcamentoVenda')
            }
        }
    };

    useEffect(() => {
        getDataUpdate(id, methods.reset, methods.setValue, formatInputNumber, token)
        getListTipoSituacaoVendas(token)
        getListClientes(token)
        getListFormaPagamentos(token)
    }, [id, methods.reset, token, formatInputNumber, methods.setValue]);

    useEffect(() => {
        function ReturnLogin() {
            setToken(null)
            navigate('/login')
        }

        if (isError) {
            ReturnLogin()
        }
    }, [isError, navigate, setToken]);

    useEffect(() => {
        getListEnderecos(idCliente, token, methods.setValue)
    }, [idCliente, token, methods.setValue]);

    useEffect(() => {
        const totalItem = OrcamentoVendaItems ? OrcamentoVendaItems.reduce((total, item) => total + (parseFloat(item.quantidade) * parseFloat(item.valor)), 0) : 0;
        const ValorSubtotal = totalItem
        const ValorTotal = (totalItem + parseFloat(frete)) - parseFloat(desconto)
        setSubtotal(ValorSubtotal.toFixed(2))
        setTotal(ValorTotal.toFixed(2));
    }, [desconto, frete, OrcamentoVendaItems]);

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

                                        <Form.Label>Data abertura</Form.Label>
                                        <div className="row">
                                            <DatePicker
                                                dateFormat="dd/MM/yyyy"
                                                className="form-control"
                                                name="dataAbertura"
                                                selected={dataAbertura}
                                                locale={pt}
                                                onChange={(date) => {
                                                    setDataAbertura(date ? new Date(date) : null);
                                                    methods.setValue('dataAbertura', date ? date : null);
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <Form.Label>Data venda</Form.Label>
                                        <div className="row">
                                            <DatePicker
                                                dateFormat="dd/MM/yyyy"
                                                className="form-control"
                                                name="dataVenda"
                                                selected={dataVenda}
                                                locale={pt}
                                                onChange={(date) => {
                                                    setDataVenda(date ? new Date(date) : null);
                                                    methods.setValue('dataVenda', date ? date : null);
                                                }}

                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <Form.Label>Situação</Form.Label>
                                        <Controller
                                            name="idSituacao"
                                            control={methods.control}
                                            render={({ field: { onChange, value } }) => (
                                                <Select
                                                    options={TipoSituacaoVendasOption}
                                                    value={TipoSituacaoVendasOption.find((c) => c.value === value)}
                                                    onChange={(val) => onChange(val.value)}
                                                />
                                            )}
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <Form.Group className="mb-3" controlId="FormTipo">
                                            <Form.Label>Tipo</Form.Label>
                                            <Form.Select {...methods.register("tipo")}>
                                                <option value="V">Venda</option>
                                                <option value="O">Orçamento</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-4">
                                        <Form.Label>Cliente</Form.Label>
                                        <Controller
                                            name="idCliente"
                                            control={methods.control}
                                            render={({ field: { onChange, value } }) => (
                                                <Select
                                                    options={ClientesOption}
                                                    value={ClientesOption.find((c) => c.value === value)}
                                                    onChange={(val) => { onChange(val.value); setIdCliente(val.value) }}
                                                />
                                            )}
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <Form.Label>Endereço</Form.Label>
                                        <Controller
                                            name="idClienteEndereco"
                                            control={methods.control}
                                            render={({ field: { onChange, value } }) => (
                                                <Select
                                                    options={EnderecosOption}
                                                    value={EnderecosOption.find((c) => c.value === value)}
                                                    onChange={(val) => onChange(val.value)}
                                                />
                                            )}
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <Form.Label>Forma pagamento</Form.Label>
                                        <Controller
                                            name="idFormaPagamento"
                                            control={methods.control}
                                            render={({ field: { onChange, value } }) => (
                                                <Select
                                                    options={FormaPagamentosOption}
                                                    value={FormaPagamentosOption.find((c) => c.value === value)}
                                                    onChange={(val) => onChange(val.value)}
                                                />
                                            )}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <InputNumber valueForm={desconto} label="Desconto" setValueForm={methods.setValue} setValue={setDesconto} name="desconto"></InputNumber>
                                    </div>
                                    <div className="col-md-4">
                                        <InputNumber valueForm={frete} label="Frete" setValueForm={methods.setValue} setValue={setFrete} name="frete"></InputNumber>
                                    </div>
                                    <div className="col-md-12">
                                        <FloatingLabel controlId="observacao" label="Observação" >
                                            <Form.Control
                                                {...methods.register("observacao")}
                                                as="textarea"
                                                style={{ height: '150px' }}
                                            />
                                        </FloatingLabel>
                                    </div>

                                    <div className="col-12 mt-5">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <h5>Produtos</h5>
                                                            </div>
                                                            <div className="col-6">
                                                                <div className="float-end">
                                                                    <button className="button-custom-action button-custom-create" type="button" onClick={() => {
                                                                        append({
                                                                            id: 0,
                                                                            idProduto: 0,
                                                                            descricaoProduto: '',
                                                                            quantidade: 0,
                                                                            valor: 0
                                                                        })
                                                                    }}> <ion-icon name="add-outline"></ion-icon> </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {fields.map((field, index) => (
                                                        <FormItem key={field.id} index={index} field={field} remove={remove} register={methods.register} setValue={methods.setValue}></FormItem>
                                                    ))}


                                                </div>
                                            </div>
                                        </div>
                                        <div className="float-end text-end mt-2">
                                            <table className='table'>
                                                <tbody>
                                                    <tr>
                                                        <td>Total itens (+):</td>
                                                        <td>R$ {subtotal.toString().replace('.', ',')} </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Frete (+):</td>
                                                        <td>R$ {parseFloat(frete).toFixed(2).toString().replace('.', ',')} </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Desconto (-):</td>
                                                        <td>R$ {parseFloat(desconto).toFixed(2).toString().replace('.', ',')}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Total:</td>
                                                        <td>R$ {total.toString().replace('.', ',')} </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>


                                </div>
                                <div className="col-12 mt-3">
                                    <button className='button-custom button-custom-primary' type="submit">
                                        Salvar
                                    </button>
                                    <div className='float-end'>
                                        <button className='button-custom button-custom-secondary' onClick={() => navigate('/orcamentoVenda')}> Voltar</button>
                                    </div>
                                </div>
                            </Form>
                        </FormProvider>

                    </div >
                </div>
            </div>
        </div >
    );
};

export default InputForm;