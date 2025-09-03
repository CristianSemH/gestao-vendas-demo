import React from 'react';
import Form from '../../components/categoria/form'
import HeaderList from '../../components/custom/headerList'

const FormDados = () => {

    return (
        <div className="col-12">
            <HeaderList title="Atualizar categoria" nav="Home / categoria / atualizar"></HeaderList>
            <Form></Form>
        </div>
    );
};

export default FormDados;