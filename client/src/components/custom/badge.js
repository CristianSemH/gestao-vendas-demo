import React from 'react';

const badge = ({ corFundo, corTexto, texto }) => {
    return (
        <span className="badge-custom rounded-pill" style={{ backgroundColor: corFundo, color: corTexto }}>{texto}</span>
    )
};

export default badge;