import React from 'react';
import Form from '../../components/usuario/form'
import HeaderList from '../../components/custom/headerList'

const FormDados = () => {

    return (
        <div className="col-12">
            <HeaderList title="Atualizar usuário" nav="Home / usuário / atualizar"></HeaderList>
            <Form></Form>
        </div>
    );
};

export default FormDados;