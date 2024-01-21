import React from 'react';

const Pagination = ({ page, setPage, nextPageAvailable }) => {
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>{"<"}</button>
            <span>{page}</span>
            <button onClick={() => handlePageChange(page + 1)} disabled={!nextPageAvailable}>{">"}</button>
        </div>
    );
}

export default Pagination;
