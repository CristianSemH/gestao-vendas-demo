import React from 'react';
import Form from '../../components/tipoGasto/form'
import HeaderList from '../../components/custom/headerList'

const FormDados = () => {

    return (
        <div className="col-12">
            <HeaderList title="Atualizar tipo gasto" nav="Home / tipo gasto / atualizar"></HeaderList>
            <Form></Form>
        </div>
    );
};

export default FormDados;