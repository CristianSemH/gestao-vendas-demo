import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const InputNumber = ({ label, valueForm, setValueForm, setValue, name, nameSetValue }) => {

    const nameValue = nameSetValue ? nameSetValue : name

    const handleInputChange = (event) => {
        setValueForm(nameValue, formatInputNumber(event.target.value))
        setValue(formatInputNumber(event.target.value));
    };

    const formatInputNumber = (valor) => {
        const inputNumber = parseFloat(valor.replace(/[^0-9]/g, ''));

        return !isNaN(inputNumber) ? (inputNumber / 100).toFixed(2) : 0
    }

    return (
        <div>
            {label ? (<Form.Label>{label}</Form.Label>) : null}
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">R$</InputGroup.Text>
                <Form.Control type="number" step="0.01" value={valueForm} onChange={handleInputChange} />
            </InputGroup>
        </div>
    )
}

export default InputNumber;