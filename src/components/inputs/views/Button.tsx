import React from 'react'
import '../styles/button.scss'

export interface ButtonProps {
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'danger' | 'success';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    className?: string;
    fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
    children, 
    onClick, 
    type = 'button',
    variant = 'primary',
    size = 'medium',
    disabled = false,
    className = '',
    fullWidth = false
}) => {
    const classes = `custom-button ${variant} ${size} ${fullWidth ? 'full-width' : ''} ${className}`.trim()
    
    return (
        <button 
            className={classes}
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button
