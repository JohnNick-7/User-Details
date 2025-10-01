import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth.ts';

const Auth = ({ redirectTo = '/login' }) => {
    const { isAuthenticated } = useAuth()

    if (!isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }
    
    return <Navigate to="/app/user-details" replace />
}

export default Auth
