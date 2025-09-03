import React from 'react';
import Form from '../../components/tipoSituacaoVenda/form'
import HeaderList from '../../components/custom/headerList'

const FormDados = () => {

    return (
        <div className="col-12">
            <HeaderList title="Atualizar tipo situação venda" nav="Home / tipo situação venda / atualizar"></HeaderList>
            <Form></Form>
        </div>
    );
};

export default FormDados;