import React, { useState, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import { getTipoEnderecos } from '../../services/tipoEndereco';
import { getEstados } from '../../services/estado';
import { getCidadesPorEstado } from '../../services/cidade';
import { useMask } from '@react-input/mask';
import { getCep } from "../../services/cep";
import { useNavigate } from 'react-router-dom'

const ArrayField = ({ index, field, remove, register, Enderecos, setValue, getValues, watch, setToken, token }) => {
    const { control } = useFormContext();
    const navigate = useNavigate()
    const [TipoEnderecosOption, setTipoEnderecosOption] = useState([])
    const [EstadosOption, setEstadosOption] = useState([])
    const [CidadesOption, setCidadesOption] = useState([])
    const inputRefCep = useMask({ mask: '_____-___', replacement: { _: /\d/ } });
    const [isError, setIsError] = useState(false)
    const [idEstado, setIdEstado] = useState(0)
    const [isLoading, setIsLoading] = useState(false)


    async function getListTipoEndereco(token) {
        await getTipoEnderecos(0, 0, '', token).then((TipoEnderecos) => {
            setTipoEnderecosOption(TipoEnderecos.rows.map(TipoEndereco => {
                return {
                    value: TipoEndereco.id,
                    label: TipoEndereco.descricao
                }
            }))
        }).catch(err => {
            if (err.response?.status === 401) {
                setIsError(true)
            }
        });
    }

    async function getListCidades(idEstado, token) {
        await getCidadesPorEstado(idEstado, token).then((Cidades) => {
            setCidadesOption(Cidades.map(Cidade => {
                return {
                    value: Cidade.id,
                    label: Cidade.nome
                }
            }))
        }).catch(err => {
            if (err.response?.status === 401) {
                setIsError(true)
            }
        });
    }

    async function getListEstados(token) {
        await getEstados(token).then((Estados) => {
            setEstadosOption(Estados.map(Estado => {
                return {
                    value: Estado.id,
                    label: Estado.nome
                }
            }))
        }).catch(err => {
            if (err.response?.status === 401) {
                setIsError(true)
            }
        });
    }

    const handleCepChange = (e) => {
        setIsLoading(true)
        getInfoCep(getValues(`Enderecos[${index}].cep`), index, token)
    }

    async function getInfoCep(cep, index, token) {
        getCep(cep, token).then((Cep) => {
            setValue(`Enderecos[${index}].logradouro`, Cep.logradouro)
            setValue(`Enderecos[${index}].bairro`, Cep.bairro)
            setValue(`Enderecos[${index}].IdCidade`, Cep.idCidade)
            setValue(`Enderecos[${index}].Cidade.idEstado`, Cep.idEstado)
            setIsLoading(false)
        }).catch(err => {
            if (err.response?.status === 401) {
                setIsError(true)
            }
        });
    }

    useEffect(() => {
        getListTipoEndereco(token)
        getListEstados(token)
    }, [token]);

    useEffect(() => {
        if (Enderecos) {
            if (Enderecos[index]) {
                setIdEstado(Enderecos[index].Cidade.idEstado)
            }
        }
    }, [Enderecos, index]);

    useEffect(() => {
        if (idEstado) {
            getListCidades(idEstado, token)
        }
    }, [idEstado, token]);


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
        <div className="col-12 mt-3">

            <Form.Control type="hidden" {...register(`Enderecos.${index}.id`)} />
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="row">
                            <div className="col-6">
                                Endereço {index + 1}
                            </div>
                            <div className="col-6">
                                <div className="float-end">
                                    <button className='button-custom-action button-custom-delete' onClick={() => { remove(index) }}><ion-icon name="trash-bin"></ion-icon></button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <Form.Label>Tipo endereço</Form.Label>

                            <Controller
                                name={`Enderecos.${index}.idTipoEndereco`}
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        options={TipoEnderecosOption}
                                        value={TipoEnderecosOption.find((c) => c.value === value)}
                                        onChange={(val) => onChange(val.value)}
                                    />
                                )}
                            />

                        </div>
                        <div className="col-md-4">
                            <Form.Group controlId="formNome">
                                <Form.Label>CEP</Form.Label>
                                <div className="input-group mb-3">
                                    <Controller
                                        name={`Enderecos.${index}.cep`}
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <Form.Control
                                                ref={inputRefCep}
                                                type="text"
                                                value={value}
                                                onChange={onChange}
                                            />
                                        )}
                                    />
                                    <button type="button" className="input-group-text" id="basic-addon2" onClick={handleCepChange} disabled={isLoading}>{isLoading ? <span className="spinner-border spinner-border-sm" aria-hidden="true"></span> : <ion-icon name="search-outline"></ion-icon>}</button>
                                </div>
                            </Form.Group>
                        </div>

                        <div className="col-md-4">
                            <Form.Group className="mb-3" controlId="formNome">
                                <Form.Label>Rua</Form.Label>
                                <Form.Control type="text" {...register(`Enderecos.${index}.logradouro`)} />
                            </Form.Group>
                        </div>
                        <div className="col-md-4">
                            <Form.Group className="mb-3" controlId="formNome">
                                <Form.Label>Número</Form.Label>
                                <Form.Control type="text" {...register(`Enderecos.${index}.numero`)} />
                            </Form.Group>
                        </div>
                        <div className="col-md-4">
                            <Form.Group className="mb-3" controlId="formNome">
                                <Form.Label>Bairro</Form.Label>
                                <Form.Control type="text" {...register(`Enderecos.${index}.bairro`)} />
                            </Form.Group>
                        </div>
                        <div className="col-md-4">
                            <Form.Group className="mb-3" controlId="formNome">
                                <Form.Label>Complemento</Form.Label>
                                <Form.Control type="text" {...register(`Enderecos.${index}.complemento`)} />
                            </Form.Group>
                        </div>
                        <div className="col-md-4">
                            <Form.Group className="mb-3" controlId="formNome">
                                <Form.Label>Referência</Form.Label>
                                <Form.Control type="text" {...register(`Enderecos.${index}.referencia`)} />
                            </Form.Group>
                        </div>
                        <div className="col-md-4">
                            <Form.Label>UF</Form.Label>
                            <Controller
                                control={control}
                                name={`Enderecos.${index}.Cidade.idEstado`}
                                render={
                                    ({ field: { onChange, ref } }) => (
                                        <Select
                                            inputRef={ref}
                                            options={EstadosOption}
                                            value={EstadosOption.find((c) => c.value === watch(`Enderecos[${index}].Cidade.idEstado`))}
                                            onChange={(val) => { onChange(val.value); setValue(`Enderecos[${index}].IdCidade`, 0); getListCidades(val.value) }}
                                        />
                                    )
                                }
                            />
                        </div>
                        <div className="col-md-4">

                            <Form.Label>Cidade</Form.Label>

                            <Controller
                                name={`Enderecos.${index}.IdCidade`}
                                control={control}
                                render={({ field: { onChange, ref } }) => (
                                    <Select
                                        inputRef={ref}
                                        options={CidadesOption}
                                        value={CidadesOption.find((c) => c.value === watch(`Enderecos[${index}].IdCidade`))}
                                        onChange={(val) => { onChange(val.value) }}
                                    />
                                )}
                            />
                        </div>
                        <div className="col-md-4">
                            <Form.Group className="mb-3" controlId="formNome">
                                <Form.Label>Endereço padrão</Form.Label>
                                <Form.Check type="switch" id="custom-switch" {...register(`Enderecos.${index}.EnderecoPadrao`)} />
                            </Form.Group>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default ArrayField;
