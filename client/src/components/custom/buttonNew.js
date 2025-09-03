import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const ButtonNew = ({ eventOnClick }) => {

    const renderTooltipCreate = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Novo registro
        </Tooltip>
    );

    return (
        <div className='float-end mb-4'>
            <OverlayTrigger
                placement="top"
                delay={{ show: 50, hide: 450 }}
                overlay={renderTooltipCreate}
            >
                <button className="button-custom-action button-custom-create" onClick={eventOnClick} text="Adicionar" ><ion-icon name="add-outline"></ion-icon></button>
            </OverlayTrigger>
        </div>
    )
}

export default ButtonNew;