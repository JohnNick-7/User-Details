import React from 'react'
import '../styles/button.scss'
const Button = (props: any) => {
    const { onClick } = props
    return (
        <div>
            <button className="customButton" onClick={onClick}>
                {props.children}
            </button>
        </div>
    )
}

export default Button
