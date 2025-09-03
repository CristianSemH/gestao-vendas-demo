import React, { useState, Children } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const ButtonAction = ({ eventDelete, eventUpdate, children }) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const renderTooltipUpdate = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Editar registro
        </Tooltip>
    );

    const renderTooltipDelete = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Excluir registro
        </Tooltip>
    );

    return (
        <>
            <div className='group-action-button'>
                <OverlayTrigger
                    placement="top"
                    delay={{ show: 50, hide: 450 }}
                    overlay={renderTooltipUpdate}
                >
                    <button className='button-custom-action button-custom-update' onClick={eventUpdate}><ion-icon name="pencil"></ion-icon></button>
                </OverlayTrigger>
                <OverlayTrigger
                    placement="top"
                    delay={{ show: 50, hide: 450 }}
                    overlay={renderTooltipDelete}
                >
                    <button className='button-custom-action button-custom-delete' onClick={handleShow}><ion-icon name="trash-bin"></ion-icon></button>
                </OverlayTrigger>
                {Children.map(children, child =>
                    <>
                        {child}
                    </>
                )}

            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header className='d-flex justify-content-center'>
                    <Modal.Title className='text-center'>Excluir registro!</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-center'>Realmente deseja deletar o registro?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Não
                    </Button>
                    <Button variant="success" onClick={eventDelete}>
                        Sim
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ButtonAction;