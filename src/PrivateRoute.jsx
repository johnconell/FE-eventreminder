import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    // Directly checking token in render (inefficient and not ideal)
    if (!localStorage.getItem('auth_token')) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute;
