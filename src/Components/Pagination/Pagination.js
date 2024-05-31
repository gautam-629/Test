import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
	const pages = [];

	for (let i = 1; i <= totalPages; i++) {
		pages.push(
			<li key={i} className={i === currentPage ? 'active' : ''}>
				<button onClick={() => onPageChange(i)}>{i}</button>
			</li>
		);
	}
	return <ul className="pagination">{pages}</ul>;
};

export default Pagination;
