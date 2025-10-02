import React from 'react'
import { useSelector } from 'react-redux'
import './styles/table.scss'
import Pagination from '../pagination/Pagination.tsx'
import Button from '../inputs/views/Button.tsx'
import { selectDisplayedUsers, selectLoading } from '../../store/index.ts'

interface Column {
    id: string;
    header: string;
    key: string;
}

interface TableWrapperProps {
    columns: Column[];
    editItem: (row: any) => void;
    deleteItem: (id: string) => void;
}

const TableWrapper: React.FC<TableWrapperProps> = ({ columns,  editItem, deleteItem }) => {
    const tableData = useSelector(selectDisplayedUsers)
    const loading = useSelector(selectLoading)

    return (
        <div className='table-wrapper'>
            {/* Table Section */}
            {loading ? (
                <div className='loading'>Loading users...</div>
            ) : (
                <>
                    <div className='table-scroll-container'>
                        <table className='table'>
                            <thead className='table-header'>
                                <tr>
                                    {columns.map((column) => (
                                        <th key={column.id}>{column.header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className='table-body'>
                                {tableData.length > 0 ? (
                                    tableData.map((row: any) => (
                                        <tr key={row.id}>
                                            {columns.map((column) => (
                                                <td key={column.id}>
                                                    {column.key === 'imageLink' ? (
                                                        <div className='email-cell'>
                                                            <img
                                                                src={row.imageLink || 'https://via.placeholder.com/40'}
                                                                alt={`${row.firstName} ${row.lastName}`}
                                                                className='user-avatar'
                                                            />
                                                        </div>
                                                    ) : column.key === 'actions' ? (
                                                        <div className='action-buttons'>
                                                            <Button variant='primary' size='small' onClick={() => editItem(row)}>Edit</Button>
                                                            <Button variant='danger' size='small' onClick={() => deleteItem(row.id)} >Delete</Button>
                                                        </div>
                                                    ) : (
                                                        row[column.key]
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={columns.length} className='no-data'>
                                            No users available.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <Pagination />
                </>
            )}
        </div>
    )
}

export default TableWrapper
