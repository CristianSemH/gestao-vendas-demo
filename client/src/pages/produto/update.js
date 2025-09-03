import React from 'react';
import Form from '../../components/produto/form'
import HeaderList from '../../components/custom/headerList'

const FormDados = () => {

    return (
        <div className="col-12">
            <HeaderList title="Atualizar produto" nav="Home / produto / atualizar"></HeaderList>
            <Form></Form>
        </div>
    );
};

export default FormDados;