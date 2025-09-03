import React from 'react';
import Form from '../../components/cliente/form'
import HeaderList from '../../components/custom/headerList'

const FormDados = () => {

    return (
        <div className="col-12">
            <HeaderList title="Atualizar cliente" nav="Home / cliente / atualizar"></HeaderList>
            <Form></Form>
        </div>
    );
};

export default FormDados;