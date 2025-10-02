import React, { useState } from 'react'
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import '../styles/input.scss'

export interface PasswordProps {
    name?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    className?: string;
    fullWidth?: boolean;
    label?: string;
    error?: string;
}

const Password: React.FC<PasswordProps> = ({ 
    name,
    placeholder,
    value,
    onChange,
    onBlur,
    disabled = false,
    readOnly = false,
    required = false,
    className = '',
    fullWidth = false,
    label,
    error
}) => {
    const [passwordType, setPasswordType] = useState<'password' | 'text'>('password')

    const togglePassword = () => {
        setPasswordType(prev => prev === 'password' ? 'text' : 'password')
    }

    return (
        <div className={`input-wrapper ${fullWidth ? 'full-width' : ''} ${error ? 'has-error' : ''}`}>
            {label && (
                <label className='input-label'>
                    {label}
                    {required && <span className='required'>*</span>}
                </label>
            )}
            <div className='input-container'>
                <input 
                    className={`custom-input ${className}`}
                    type={passwordType}
                    name={name}
                    placeholder={placeholder}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    disabled={disabled}
                    readOnly={readOnly}
                    required={required}
                />
                <span 
                    onClick={togglePassword} 
                    className="eyeIcon"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && togglePassword()}
                >
                    {passwordType === 'password' ? <MdVisibilityOff /> : <MdVisibility />}
                </span>
            </div>
            {error && <span className='error-message'>{error}</span>}
        </div>
    )
}

export default Password
