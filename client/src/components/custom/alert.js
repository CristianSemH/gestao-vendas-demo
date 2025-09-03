import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

function AlertMessage({ TitleAlert, MessageAlert }) {
    const [show, setShow] = useState(true);

    if (show) {
        return (
            <div className="alert-custom">
                <Alert className="alert-custom-div" variant="danger" onClose={() => setShow(false)} dismissible>
                    {TitleAlert ? <Alert.Heading>{TitleAlert}</Alert.Heading> : null}
                    {MessageAlert}
                </Alert>
            </div>
        );
    }
}

export default AlertMessage;