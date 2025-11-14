import React from 'react';
import Form from '../../components/despesa/form'
import HeaderList from '../../components/custom/headerList'

const FormDados = () => {

    return (
        <div className="col-12">
            <HeaderList title="Adicionar despesa" nav="Home / despesa / adicionar"></HeaderList>
            <Form></Form>
        </div>
    );
};

export default FormDados;