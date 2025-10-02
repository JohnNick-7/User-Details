import React from 'react'
import Button from '../inputs/views/Button.tsx'
import { IoClose } from 'react-icons/io5';
import './modal.scss'

const Modal = (props: any) => {
    const { title, onClose, children, isOpen } = props;
    
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // Only close if clicking directly on the overlay, not on modal content
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    
    return (
        <div className='modal-overlay' onClick={handleOverlayClick} style={{ display: isOpen ? 'flex' : 'none' }}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}> 
                <div className='modal-header'>
                    <h2>{title}</h2>
                    <Button variant='primary' size='small' onClick={onClose}><IoClose /></Button>
                </div>
                <div className='modal-body'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal
