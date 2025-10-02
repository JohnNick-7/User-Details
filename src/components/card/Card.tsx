import React from 'react'
import Button from '../inputs/views/Button.tsx'
import './styles/card.scss'
import { IoPencil, IoTrashBin } from 'react-icons/io5'

const Card = (props: any) => {
    const { tableData, editItem, deleteItem } = props
    return (
        <>
            {tableData && tableData.length > 0 ? (
                tableData.map((item: any) => (
                    <div className='card-wrapper' key={item.id}>
                        <div className='card-hover-actions'>
                            <Button 
                                variant='primary' 
                                size='small' 
                                onClick={() => editItem(item)}
                                className='card-action-btn edit-btn'
                            >
                               <IoPencil />
                            </Button>
                            <Button 
                                variant='danger' 
                                size='small' 
                                onClick={() => deleteItem(item.id)}
                                className='card-action-btn delete-btn'
                            >
                                <IoTrashBin />
                            </Button>
                        </div>
                        <div className='image-container'>
                            <img
                                src={item.imageLink || 'https://via.placeholder.com/40'}
                                alt={`${item.firstName} ${item.lastName}`}
                                className='user-avatar'
                            />
                        </div>
                        <div className='card-content'>
                            <h3>{item.firstName} {item.lastName}</h3>
                            <p>{item.email}</p>
                        </div>
                    </div>
                ))
            ) : (
                <div className='no-cards'>No users available.</div>
            )}
        </>
    )
}

export default Card
