import React, { useState, useEffect, useContext } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import { getProdutos } from '../../services/produto'
import InputNumber from '../../components/custom/inputNumber';
import StoreContext from "../context/Context";
import { useNavigate } from 'react-router-dom';

const ArrayField = ({ index, field, remove, register, setValue }) => {
    const { control } = useFormContext();

    const [ProdutosOption, setProdutosOption] = useState([])
    const [valor, setValor] = useState(0);
    const { setToken, token } = useContext(StoreContext)
    const [isError, setIsError] = useState(false)
    const navigate = useNavigate()

    async function getListProdutos(token) {
        const result = await getProdutos(0, 0, '', token)

        if (result.response?.status === 401) {
            setIsError(true)
        }

        if (result.rows) {
            setProdutosOption(result.rows.map(Produto => {
                return {
                    value: Produto.id,
                    label: Produto.id + '- ' + Produto.descricao,
                    descripition: Produto.descricao,
                    price: Produto.valorVenda
                }
            }))
        }
    }

    useEffect(() => {
        setValor(field.valor)
        getListProdutos(token)
    }, [token, field.valor]);

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
            <Form.Control type="hidden" {...register(`OrcamentoVendaItems.${index}.id`)} />
            <div className="card mt-2">
                <div className="card-body">
                    <div className="row">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-6">
                                    Item {index + 1}
                                </div>
                                <div className="col-6">
                                    <div className="float-end">
                                        <button className='button-custom-action button-custom-delete' onClick={() => { remove(index) }}><ion-icon name="trash-bin"></ion-icon></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <Form.Label>Produto</Form.Label>
                            <Controller
                                name={`OrcamentoVendaItems.${index}.idProduto`}
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        options={ProdutosOption}
                                        value={ProdutosOption.find((c) => c.value === value)}
                                        onChange={(val) => {
                                            onChange(val.value);
                                            setValue(`OrcamentoVendaItems[${index}].descricaoProduto`, val.descripition);
                                            setValue(`OrcamentoVendaItems[${index}].valor`, val.price);
                                            setValor(val.price);
                                            setValue(`OrcamentoVendaItems[${index}].quantidade`, 1);
                                        }}
                                    />
                                )}
                            />
                        </div>
                        <div className="col-md-3">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control type="text" {...register(`OrcamentoVendaItems.${index}.descricaoProduto`)} />
                        </div>
                        <div className="col-md-3">
                            <Form.Label>Quantidade</Form.Label>
                            <Form.Control type="number" step="1,00" {...register(`OrcamentoVendaItems.${index}.quantidade`)} />
                        </div>
                        <div className="col-md-3">
                            <Form.Label>Preço unitário</Form.Label>
                            <InputNumber valueForm={valor} setValueForm={setValue} setValue={setValor} name={`OrcamentoVendaItems.${index}.valor`} nameSetValue={`OrcamentoVendaItems.[${index}].valor`}></InputNumber>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArrayField;
