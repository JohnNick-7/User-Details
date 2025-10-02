import React from 'react';
import { useAuth } from '../login/useAuth.ts';

const Header: React.FC = () => {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        // You can add navigation to login page here if needed
        window.location.href = '/login';
    };

    return (
        <header className="app-header">
            <div className="header-content">
                <div className="header-left">
                    <h1 className="app-title">User Management System</h1>
                </div>
                <div className="header-right">
                    <div className="user-info">
                        <span className="user-name">Elon Musk</span>
                        <div className="user-avatar">G</div>
                    </div>
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
