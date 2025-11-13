import React, { useState, useEffect } from 'react';

const Pagination = ({ handlePageChange, currentPage, totalPages, totalRows }) => {

    const [pagesNav, setPagesNav] = useState([]);

    const CalculePages = (total, page) => {

        const maxPagesToShow = 6;

        let startPage = Math.max(1, page - 3);
        let endPage = Math.min(total, startPage + maxPagesToShow - 1);

        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        let pages = []
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i)
        }
        setPagesNav(pages)
    }

    useEffect(() => {
        CalculePages(totalPages, currentPage);
    }, [totalPages, currentPage]);

    return (
        <nav aria-label="Page navigation">
            <div className='col-12'>
                <div className='row'>
                    <div className='col-6'>
                        <p className="fst-italic pagination-text">{totalRows} registros e {totalPages} páginas</p>
                    </div>
                    <div className='col-6'>
                        <ul className="pagination float-end">
                            <li className="page-item" onClick={() => handlePageChange(currentPage - 1)}><button className="page-link" disabled={currentPage === 1}><span aria-hidden="true">&laquo;</span> </button></li>
                            {pagesNav.length > 0 && (pagesNav.map((page) => (
                                <li key={page} className={`page-item ${page === currentPage ? `active` : ``}`} onClick={() => handlePageChange(page)}><button className="page-link" >{page}</button></li>
                            )))}
                            <li className="page-item" onClick={() => handlePageChange(currentPage + 1)} ><button className="page-link" disabled={currentPage === totalPages}><span aria-hidden="true" >&raquo;</span> </button></li>
                        </ul>
                    </div>

                </div >
            </div>
        </nav >
    )
}


export default Pagination;