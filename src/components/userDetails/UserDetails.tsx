import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TableWrapper from '../table/TableWrapper.tsx'
import { deleteUser, fetchUsers, setSearchQuery } from '../../store/slices/userSlice.ts'
import { selectSearch } from '../../store/index.ts'
import type { AppDispatch } from '../../store/index.ts'
import Header from '../header/Header.tsx'
import CommonInput from '../inputs/views/CommonInput.tsx'
import Button from '../inputs/views/Button.tsx'
import '../header/styles/header.scss'
import './styles/userDetails.scss'
import ManageUser from './ManageUser.tsx'
import { columns } from './model/user.ts'

const UserDetails: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const searchQuery = useSelector(selectSearch)
    const [viewMode, setViewMode] = useState<'table' | 'card'>('table')
    const [state, setState] = useState({
        isOpen: false,
        isEdit: false,
        row: null
    })
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQuery(e.target.value))
    }

    const editItem = (row: any) => {
        setState({ ...state, isOpen: true, isEdit: true, row: row })
    }

    const deleteItem = (id: string) => {
        dispatch(deleteUser(id))
    }

    const createUser = () => {
        setState({ ...state, isOpen: true, isEdit: false, row: null })
    }


    useEffect(() => {
        console.log('UserDetails component mounted');
        dispatch(fetchUsers())
    }, [dispatch])

    return (
        <div className='user-details-container'>
            <Header />
            <div className='main-content'>
                <div className='content-header'>
                    <h1 className='users-title'>Users</h1>
                    <div className='header-right'>
                        <CommonInput
                            type='text'
                            placeholder='input search text'
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className='search-input-field'
                        />
                        <Button variant='primary' size='small' onClick={() => createUser()}>
                            Create User
                        </Button>
                    </div>
                </div>

                <div className='table-container-wrapper'>
                    <div className='view-toggle-section'>
                        <div className='view-toggles'>
                            <button
                                className={`view-toggle-btn table-view ${viewMode === 'table' ? 'active' : ''}`}
                                onClick={() => setViewMode('table')}
                            >
                                Table
                            </button>
                            <button
                                className={`view-toggle-btn card-view ${viewMode === 'card' ? 'active' : ''}`}
                                onClick={() => setViewMode('card')}
                            >
                                Card
                            </button>
                        </div>
                    </div>

                    <TableWrapper columns={columns} viewMode={viewMode} editItem={editItem} deleteItem={deleteItem} />
                </div>
            </div>
            <ManageUser state={state} setState={setState} />
        </div>
    )
}

export default UserDetails
