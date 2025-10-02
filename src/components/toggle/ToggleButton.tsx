import React from 'react';
import './toggle.scss'

export interface ToggleOption {
    value: string;
    label: string;
    icon?: string | React.ReactNode;
    className?: string;
}

export interface ToggleButtonProps {
    options: ToggleOption[];
    value: string;
    onChange: (value: string) => void;
    className?: string;
    variant?: 'default' | 'compact' | 'pills';
    size?: 'small' | 'medium' | 'large';
    fullWidth?: boolean;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
    options,
    value,
    onChange,
    className = '',
    variant = 'default',
    size = 'medium',
    fullWidth = false
}) => {
    return (
        <div className={`toggle-section ${className}`}>
            <div className={`toggle-group ${variant} ${size} ${fullWidth ? 'full-width' : ''}`}>
                {options.map((option) => (
                    <button
                        key={option.value}
                        className={`toggle-btn ${option.className || ''} ${value === option.value ? 'active' : ''}`}
                        onClick={() => onChange(option.value)}
                        type="button"
                    >
                        {option.icon && (
                            <span className="toggle-icon">
                                {option.icon}
                            </span>
                        )}
                        <span className="toggle-label">{option.label}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default ToggleButton;
