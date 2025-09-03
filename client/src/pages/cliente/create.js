import React from 'react';
import Form from '../../components/cliente/form'
import HeaderList from '../../components/custom/headerList'

const FormDados = () => {

    return (
        <div className="col-12">
            <HeaderList title="Adicionar cliente" nav="Home / cliente / adicionar"></HeaderList>
            <Form></Form>
        </div>
    );
};

export default FormDados;