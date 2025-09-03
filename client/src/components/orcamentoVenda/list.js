import React, { useState, useEffect, useContext } from 'react';
import { getOrcamentoVendas, deleteOrcamentoVenda,getOrcamentoVendasById } from '../../services/orcamentoVenda';
import { useNavigate } from 'react-router-dom'
import HeaderList from '../custom/headerList'
import Moment from 'react-moment'
import BadgeCustom from '../custom/badge'
import Pagination from '../custom/Pagination'
import ButtonAction from '../custom/buttonAction'
import ButtonSearch from '../custom/buttonSearch'
import ButtonNew from '../custom/buttonNew'
import StoreContext from '../context/Context'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import orcamentoVendasPDF from '../reports/orcamentoVendas/orcamentoVendas';


const OrcamentoVendaList = () => {

    const navigate = useNavigate()
    const [orcamentoVendas, setOrcamentoVendas] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [filtro, setFiltro] = useState('');
    const [totalRows, setTotalRows] = useState(0);
    const [isError, setIsError] = useState(false)
    const { setToken, token } = useContext(StoreContext)

    const loadOrcamentoVendas = async (page, filtro, token) => {

        const limit = 9;

        const offset = (page - 1) * limit;

        const response = await getOrcamentoVendas(limit, offset, filtro, token)
        const count = response.count ? response.count : 0
        const total = Math.ceil(count / limit);

        if (response.response?.status === 401) {
            setIsError(true)
        }

        setOrcamentoVendas(response.rows);
        setTotalPages(total);
        setTotalRows(count)
    };


    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleFiltroChange = (e) => {
        setFiltro(e.target.value);
    };

    const handleDelete = async (orcamentoVendaId) => {
        await deleteOrcamentoVenda(orcamentoVendaId, token);
        if (currentPage === 1) {
            loadOrcamentoVendas(1, '', token);
        } else {
            setCurrentPage(1)
        }
    };

    useEffect(() => {
        loadOrcamentoVendas(currentPage, filtro, token);
    }, [currentPage, filtro, token]);

    useEffect(() => {
        function ReturnLogin() {
            setToken(null)
            navigate('/login')
        }

        if (isError) {
            ReturnLogin()
        }
    }, [isError, navigate, setToken]);

    const renderTooltipRelatorio = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Imprimir relatório
        </Tooltip>
    );

    const ImprimirRelatorio = async (id) => {
        const result = await getOrcamentoVendasById(id, token);

        if (result.response?.status === 401) {
            setIsError(true)
        }

        if (result) {
            orcamentoVendasPDF(result)
        }
    }

    return (
        <div className="col-12">
            <HeaderList title="Lista de Orçamento e venda" nav="Home / Orçamento e venda"></HeaderList>
            <div className='card-custom shadow-sm'>
                <div className='card-custom-header mb-3 col-12'>
                    <ButtonNew eventOnClick={() => navigate('/orcamentoVenda/create')}></ButtonNew>
                    <ButtonSearch eventOnChange={handleFiltroChange}></ButtonSearch>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Código</th>
                                <th scope="col">Abertura</th>
                                <th scope="col">Data venda</th>
                                <th scope="col">Cliente</th>
                                <th scope="col">Forma pagamento</th>
                                <th scope="col">Desconto</th>
                                <th scope="col">Frete</th>
                                <th scope="col">Total</th>
                                <th scope="col">Situação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orcamentoVendas?.length > 0 && (orcamentoVendas.map((orcamentoVenda) => (
                                <tr key={orcamentoVenda.id}>
                                    <td>
                                        <ButtonAction eventDelete={() => handleDelete(orcamentoVenda.id)} eventUpdate={() => navigate(`/orcamentoVenda/update/${orcamentoVenda.id}`)}>
                                            {<OverlayTrigger
                                                placement="top"
                                                delay={{ show: 50, hide: 450 }}
                                                overlay={renderTooltipRelatorio}
                                            >
                                                <button className='button-custom-action button-custom-info' onClick={() => ImprimirRelatorio(orcamentoVenda.id)}><ion-icon name="reader-outline"></ion-icon></button>
                                            </OverlayTrigger>}
                                        </ButtonAction>


                                    </td>
                                    <td>{orcamentoVenda.id} </td>
                                    <td><Moment format="DD/MM/YYYY" date={orcamentoVenda.dataAbertura}></Moment></td>
                                    <td>{orcamentoVenda.dataVenda ? <Moment format="DD/MM/YYYY" date={orcamentoVenda.dataVenda}></Moment> : ''}</td>
                                    <td>{orcamentoVenda.Cliente.nome}</td>
                                    <td>{orcamentoVenda.FormaPagamento.descricao}</td>
                                    <td>R$ {parseFloat(orcamentoVenda.desconto).toFixed(2).toString().replace('.', ',')}</td>
                                    <td>R$ {parseFloat(orcamentoVenda.frete).toFixed(2).toString().replace('.', ',')}</td>
                                    <td>R$ {parseFloat(orcamentoVenda.valorTotal).toFixed(2).toString().replace('.', ',')}</td>
                                    <td><BadgeCustom texto={orcamentoVenda.TipoSituacao.descricao} corTexto={orcamentoVenda.TipoSituacao.corHexaDecimalFonte} corFundo={orcamentoVenda.TipoSituacao.corHexaDecimalFundo}></BadgeCustom></td>
                                </tr>
                            )))}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    currentPage={currentPage}
                    handlePageChange={handlePageChange}
                    totalPages={totalPages}
                    totalRows={totalRows}
                ></Pagination>
            </div>
        </div>
    );
};

export default OrcamentoVendaList;