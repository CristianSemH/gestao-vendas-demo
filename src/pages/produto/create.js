import React from 'react';
import Form from '../../components/produto/form'
import HeaderList from '../../components/custom/headerList'

const FormDados = () => {

    return (
        <div className="col-12">
            <HeaderList title="Adicionar produto" nav="Home / produto / adicionar"></HeaderList>
            <Form></Form>
        </div>
    );
};

export default FormDados;