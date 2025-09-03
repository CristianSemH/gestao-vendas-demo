import React, { useEffect, useState, useContext, useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import { useForm, Controller } from 'react-hook-form';
import { getDespesasById, addDespesa, updateDespesa } from '../../services/despesa';
import { getFormaPagamentos } from '../../services/formaPagamento';
import { getTipoSituacaos } from '../../services/tipoSituacaoDespesa';
import { getTipoGastos } from '../../services/tipoGasto';
import { useParams, useNavigate } from 'react-router-dom'
import Alert from '../../components/custom/alert';
import Select from 'react-select';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import DatePicker, { registerLocale } from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import pt from 'date-fns/locale/pt';
import InputNumber from '../custom/inputNumber';
import StoreContext from '../context/Context';

const InputForm = () => {

    const { register, handleSubmit, reset, control, setValue } = useForm()
    const [MesssagesError, setMesssagesError] = useState([])
    const [FormaPagamentosOption, setFormaPagamentosOption] = useState([])
    const [TipoSituacaoDespesaOption, setTipoSituacaoDespesaOption] = useState([])
    const [TipoGastoOption, setTipoGastoOption] = useState([])
    const [dataAbertura, setDataAbertura] = useState(new Date());
    const [dataPagamento, setDataPagamento] = useState(new Date());
    const [valorTotal, setValorTotal] = useState(0);
    const [isError, setIsError] = useState(false)
    const { setToken, token } = useContext(StoreContext)
    const navigate = useNavigate()
    const { id } = useParams();
    registerLocale("pt", pt);

    const formatInputNumber = useCallback((valor) => {
        const inputNumber = parseFloat(valor.replace(/[^0-9]/g, ''));

        return !isNaN(inputNumber) ? (inputNumber / 100).toFixed(2) : 0
    },
        []
    );

    async function getDataUpdate(id, reset, setValue, formatInputNumber, token) {
        if (id) {
            const result = await getDespesasById(id, token);

            if (result.response?.status === 401) {
                setIsError(true)
            }

            if (result) {
                setDataAbertura(new Date(result.dataAbertura + 'T12:00:00'));
                setDataPagamento(new Date(result.dataPagamento + 'T12:00:00'));
                setValorTotal(formatInputNumber(result.valorTotal))
                reset(result)
            }
        } else {
            setDataAbertura(new Date());
            setDataPagamento(new Date());
            setValue('dataAbertura', new Date());
            setValue('dataPagamento', new Date());
        }
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

    async function getListTipoGasto(token) {
        await getTipoGastos(0, 0, '', token).then((tipoGastos) => {
            setTipoGastoOption(tipoGastos.rows.map(tipoGasto => {
                return {
                    value: tipoGasto.id,
                    label: tipoGasto.descricao
                }
            }))
        }).catch(err => {
            console.log(err)
        });
    }

    async function getListTipoSituacaoDespesa(token) {
        await getTipoSituacaos(0, 0, '', token).then((tipoSituacaoDespesa) => {
            setTipoSituacaoDespesaOption(tipoSituacaoDespesa.rows.map(tipoSituacaoVenda => {
                return {
                    value: tipoSituacaoVenda.id,
                    label: tipoSituacaoVenda.descricao
                }
            }))
        }).catch(err => {
            console.log(err)
        });
    }

    const handleUpdateCreate = async (despesa) => {

        setMesssagesError([])

        if (id) {
            const result = await updateDespesa(id, despesa, token);

            if (result.response?.status === 401) {
                setIsError(true)
            }

            if (result.code) {
                if (result.code === 'ERR_BAD_REQUEST') {
                    setMesssagesError(result.response.data)
                }
            } else {
                navigate('/despesa')
            }

        } else {
            const result = await addDespesa(despesa, token);

            if (result.response?.status === 401) {
                setIsError(true)
            }

            if (result.code) {
                if (result.code === 'ERR_BAD_REQUEST') {
                    setMesssagesError(result.response.data)
                }
            } else {
                navigate('/despesa')
            }
        }
    };

    useEffect(() => {
        getDataUpdate(id, reset, setValue, formatInputNumber, token)
        getListTipoSituacaoDespesa(token)
        getListFormaPagamentos(token)
        getListTipoGasto(token)
    }, [id, reset, setValue, formatInputNumber, token]);

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
                                    <Form.Group className="mb-3" controlId="formDespesa">
                                        <Form.Label>Descrição</Form.Label>
                                        <Form.Control type="text" {...register("descricao")} />
                                    </Form.Group>
                                </div>

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
                                                setDataAbertura(new Date(date));
                                                setValue('dataAbertura', date);
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <Form.Label>Data pagamento</Form.Label>
                                    <div className="row">
                                        <DatePicker
                                            dateFormat="dd/MM/yyyy"
                                            className="form-control"
                                            name="dataPagamento"
                                            locale={pt}
                                            selected={dataPagamento}
                                            onChange={(date) => {
                                                setDataPagamento(new Date(date));
                                                setValue('dataPagamento', date);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <Form.Label>Situação</Form.Label>
                                    <Controller
                                        name="idSituacao"
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <Select
                                                options={TipoSituacaoDespesaOption}
                                                value={TipoSituacaoDespesaOption.find((c) => c.value === value)}
                                                onChange={(val) => onChange(val.value)}
                                            />
                                        )}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <Form.Label>Tipo gasto</Form.Label>
                                    <Controller
                                        name="idTipoGasto"
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <Select
                                                options={TipoGastoOption}
                                                value={TipoGastoOption.find((c) => c.value === value)}
                                                onChange={(val) => onChange(val.value)}
                                            />
                                        )}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <Form.Label>Forma pagamento</Form.Label>
                                    <Controller
                                        name="idFormaPagamento"
                                        control={control}
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
                                    <InputNumber valueForm={valorTotal} label="Total" setValueForm={setValue} setValue={setValorTotal} name="valorTotal"></InputNumber>
                                </div>

                                <div className="col-md-12 mt-3 mb-3">
                                    <FloatingLabel controlId="observacao" label="Observação" {...register("observacao")} >
                                        <Form.Control
                                            as="textarea"
                                            style={{ height: '150px' }}
                                        />
                                    </FloatingLabel>
                                </div>
                            </div>
                            <div className="col-12">
                                <button className='button-custom button-custom-primary' type="submit">
                                    Salvar
                                </button>
                                <div className='float-end'>
                                    <button className='button-custom button-custom-secondary' onClick={() => navigate('/despesa')}> Voltar</button>
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