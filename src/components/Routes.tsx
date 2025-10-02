import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Login from './login/Login.tsx';
import Auth from './login/Auth.tsx';
import UserDetails from './userDetails/UserDetails.tsx';

const Routes = () => {
    const routeObject = [
        {
            path: '/', element: <Navigate to="/app" replace />
        },
        {
            path: "/app",
            element: <Auth />,
            children: [
                {
                    index: true,
                    element: <Navigate to="user-details" replace />
                },
                {
                    path: 'user-details',
                    element: <UserDetails/>
                }
            ]
        },
        {
            path: "/login",
            element: <Login />
        },
    ];

    // Use basename for GitHub Pages deployment
    const router = createBrowserRouter(routeObject, {
        basename: process.env.PUBLIC_URL || '/'
    });

    return <RouterProvider router={router} />;
}

export default Routes
