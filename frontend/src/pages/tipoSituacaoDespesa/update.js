import React from 'react';
import Form from '../../components/tipoSituacaoDespesa/form'
import HeaderList from '../../components/custom/headerList'

const FormDados = () => {

    return (
        <div className="col-12">
            <HeaderList title="Atualizar tipo situação despesa" nav="Home / tipo situação despesa / atualizar"></HeaderList>
            <Form></Form>
        </div>
    );
};

export default FormDados;