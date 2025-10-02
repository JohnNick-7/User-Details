import React from 'react'
import { useSelector } from 'react-redux'
import { selectDisplayedUsers, selectLoading } from '../../store/index.ts'
import Card from './Card.tsx'
import Pagination from '../pagination/Pagination.tsx'
import './styles/cardWrapper.scss'

const CardWrapper = (props: any) => {
    const { editItem, deleteItem } = props
    const tableData = useSelector(selectDisplayedUsers)
    const loading = useSelector(selectLoading)

    return (
        <div className='card-wrapper-container'>
            {loading ? (
                <div className='loading'>Loading users...</div>
            ) : (
                <>
                    <div className='card-scroll-container'>
                        <div className='card-container'>
                            <Card tableData={tableData} editItem={editItem} deleteItem={deleteItem} />
                        </div>
                    </div>
                    <Pagination />
                </>
            )}
        </div>
    )
}

export default CardWrapper
