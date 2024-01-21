const Pagination = ({ page, setPage, nextPageAvailable }) => {
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>{"<"}</button>
            <span>{page + 1}</span>
            <button onClick={() => handlePageChange(page + 1)} disabled={!nextPageAvailable}>{">"}</button>
        </div>
    );
}

export default Pagination;
