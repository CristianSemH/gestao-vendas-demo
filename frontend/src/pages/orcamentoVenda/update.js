import React from 'react';
import Form from '../../components/orcamentoVenda/form'
import HeaderList from '../../components/custom/headerList'

const FormDados = () => {

    return (
        <div className="col-12">
            <HeaderList title="Atualizar orçamentos e vendas" nav="Home / orçamentos e vendas / atualizar"></HeaderList>
            <Form></Form>
        </div>
    );
};

export default FormDados;