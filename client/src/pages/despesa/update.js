import React from 'react';
import Form from '../../components/despesa/form'
import HeaderList from '../../components/custom/headerList'

const FormDados = () => {

    return (
        <div className="col-12">
            <HeaderList title="Atualizar despesa" nav="Home / despesa / atualizar"></HeaderList>
            <Form></Form>
        </div>
    );
};

export default FormDados;