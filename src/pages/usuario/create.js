import React from 'react';
import Form from '../../components/usuario/form'
import HeaderList from '../../components/custom/headerList'

const FormDados = () => {

    return (
        <div className="col-12">
            <HeaderList title="Adicionar usuário" nav="Home / usuário / adicionar"></HeaderList>
            <Form></Form>
        </div>
    );
};

export default FormDados;