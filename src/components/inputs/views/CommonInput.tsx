import React from 'react'
import { InputProps } from '../model/types'
import '../styles/input.scss'
const CommonInput = (props: InputProps) => {
    const { name, type, placeholder, formData, handleChange } = props
    return (
        <div className='input-container'>
            <input
                className='custom-input'
                type={type}
                placeholder={placeholder}
                value={formData?.[name]}
                name={name}
                onChange={handleChange}
            />
        </div>
    )
}

export default CommonInput
