import React from 'react';
import Form from '../../components/tipoEndereco/form'
import HeaderList from '../../components/custom/headerList'

const FormDados = () => {

    return (
        <div className="col-12">
            <HeaderList title="Adicionar categoria" nav="Home / tipo endereço / adicionar"></HeaderList>
            <Form></Form>
        </div>
    );
};

export default FormDados;