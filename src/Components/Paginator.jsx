import React from 'react';

const Paginator = () => {
    let {showPaginator, limit, page, totalCount, changePage, prevState, handleChange} = this.props;
    return (
        <div className="paginator">
            {showPaginator && <div className="pageBar">
                <button onClick={() => changePage(prevState, -1)} disabled={page === 1}>Previous Page</button>
                Page: {page}
                <button onClick={() => changePage(prevState, 1)} disabled={page >= totalCount / limit}>Next Page</button>
                <label>Results per page
                    <select value={limit} onChange={(event) =>  handleChange(event, 'limit')}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                </label>
            </div>}
        </div>
    );
}
export default Paginator;