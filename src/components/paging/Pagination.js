import '../../styles/Pagination.css'

const Pagination = ({ page, setPage, nextPageAvailable }) => {
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button className="pagination-button" onClick={() => handlePageChange(page - 1)} disabled={page === 0}>{"<"}</button>
            <span className="pagination-span">{page + 1}</span>
            <button className="pagination-button" onClick={() => handlePageChange(page + 1)} disabled={!nextPageAvailable}>{">"}</button>
        </div>
    );
    
}

export default Pagination;
