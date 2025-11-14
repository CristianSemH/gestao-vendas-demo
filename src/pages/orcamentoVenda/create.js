import React from 'react';
import Form from '../../components/orcamentoVenda/form'
import HeaderList from '../../components/custom/headerList'

const FormDados = () => {

    return (
        <div className="col-12">
            <HeaderList title="Adicionar orçamentos e vendas" nav="Home / orçamentos e vendas / adicionar"></HeaderList>
            <Form></Form>
        </div>
    );
};

export default FormDados;