import React from 'react';
import Form from '../../components/tipoSituacaoDespesa/form'
import HeaderList from '../../components/custom/headerList'

const FormDados = () => {

    return (
        <div className="col-12">
            <HeaderList title="Adicionar tipo situação despesa" nav="Home / tipo situação despesa / adicionar"></HeaderList>
            <Form></Form>
        </div>
    );
};

export default FormDados;