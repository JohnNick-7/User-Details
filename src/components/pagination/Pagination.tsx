import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPage } from '../../store/slices/userSlice.ts'
import { selectPagination } from '../../store/index.ts'

const Pagination: React.FC = () => {
    const dispatch = useDispatch()
    const { currentPage, totalPages, itemsPerPage } = useSelector(selectPagination)

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            dispatch(setCurrentPage(page))
        }
    }

    const renderPageNumbers = () => {
        const pages: React.ReactElement[] = []
        const maxVisiblePages = 5
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1)
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`pagination-btn ${i === currentPage ? 'active' : ''}`}
                >
                    {i}
                </button>
            )
        }
        return pages
    }

    // Always show pagination for debugging, remove this condition later
    // if (totalPages <= 1) return null

    return (
        <div className='pagination-container'>
            <div className='pagination-info'>
                {/* Pagination info - can be added later */}
            </div>
            <div className='pagination-controls'>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className='pagination-btn'
                >
                    Previous
                </button>
                
                {renderPageNumbers()}
                
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className='pagination-btn'
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default Pagination
