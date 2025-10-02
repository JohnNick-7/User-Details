import React from 'react'
import '../styles/input.scss'

export interface CommonInputProps {
    name?: string;
    type?: string;
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
    icon?: React.ReactNode;
}

const CommonInput: React.FC<CommonInputProps> = ({ 
    name,
    type = 'text',
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
    error,
    icon
}) => {
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
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    disabled={disabled}
                    readOnly={readOnly}
                    required={required}
                />
                {icon && <span className='input-icon'>{icon}</span>}
            </div>
            {error && <span className='error-message'>{error}</span>}
        </div>
    )
}

export default CommonInput
