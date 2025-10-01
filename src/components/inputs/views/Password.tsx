import React, { useState } from 'react'
import { InputProps } from '../model/types'
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import '../styles/input.scss'


const Password = (props: InputProps) => {
    const { name, placeholder, formData, handleChange } = props
    const [passwordType, setPasswordType] = useState("password")

    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }

    return (
        <div className='input-container'>
            <input className="custom-input"
                type={passwordType}
                name={name}
                placeholder={placeholder}
                onChange={(e) => handleChange(e)}
                value={formData?.[name]}
            ></input>
            <span onClick={togglePassword} className="eyeIcon">
                {passwordType === "password" ? <MdVisibilityOff /> : <MdVisibility />}
            </span>
        </div>
    )
}

export default Password
