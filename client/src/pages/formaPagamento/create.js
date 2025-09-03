import React from 'react';
import Form from '../../components/formaPagamento/form'
import HeaderList from '../../components/custom/headerList'

const FormDados = () => {

    return (
        <div className="col-12">
            <HeaderList title="Adicionar forma pagamento" nav="Home / forma pagamento / adicionar"></HeaderList>
            <Form></Form>
        </div>
    );
};

export default FormDados;