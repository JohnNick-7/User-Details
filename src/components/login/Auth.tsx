import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './useAuth.ts';

const Auth = ({ redirectTo = '/login' }) => {
    const { isAuthenticated } = useAuth()

    if (!isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }
    
    return <Outlet />
}

export default Auth
