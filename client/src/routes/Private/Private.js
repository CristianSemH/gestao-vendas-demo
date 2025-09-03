import React, { useContext } from "react";
import { Navigate } from 'react-router-dom';
import Context from '../../components/context/Context'

const RouterPrivate = ({ children }) => {

    const { token } = useContext(Context);

    return token ? children : <Navigate to="/login" />
}

export default RouterPrivate;