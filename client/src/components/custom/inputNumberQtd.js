import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const InputNumberQtd = ({ label, valueForm, setValueForm, setValue, name, nameSetValue }) => {

    const nameValue = nameSetValue ? nameSetValue : name

    const handleInputChange = (event) => {
        setValueForm(nameValue, formatInputNumber(event.target.value))
        setValue(formatInputNumber(event.target.value));
    };

    const formatInputNumber = (valor) => {
        const inputNumber = parseFloat(valor);
        return !isNaN(inputNumber) ? inputNumber.toFixed(2) : 0
    }

    return (
        <div>
            <Form.Group className="mb-3" controlId="FormTipo">
                {label ? (<Form.Label>{label}</Form.Label>) : null}
                <Form.Control type="number" step="1.00" value={valueForm} onChange={handleInputChange} />
            </Form.Group>
        </div>
    )
}

export default InputNumberQtd;