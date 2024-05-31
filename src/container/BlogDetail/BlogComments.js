import React, { useState } from 'react';
import './BlogComments.css';
import Emoji1 from '../../Assets/upvote-emoji.png';
import Emoji2 from '../../Assets/love-emoji.png';
import Emoji3 from '../../Assets/funny-emoji.png';
import Emoji4 from '../../Assets/angry-emoji.png';
import Emoji5 from '../../Assets/surprise-emoji.png';
import Emoji6 from '../../Assets/sad-emoji.png';
import ReactPaginate from 'react-paginate';
// import Image from '../../Assets/Testimonials/person-3.jpg';
import Image from '../../Assets/user-default.png';

const getTimeDifference = (createdAt) => {
	const date = new Date(createdAt);
	const now = new Date();
	const diff = now - date;
	const seconds = Math.floor(diff / 1000);

	if (seconds < 60) {
		return `${seconds} seconds ago`;
	} else if (seconds < 3600) {
		const minutes = Math.floor(seconds / 60);
		return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
	} else if (seconds < 86400) {
		const hours = Math.floor(seconds / 3600);
		return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
	} else {
		const days = Math.floor(seconds / 86400);
		return `${days} ${days === 1 ? 'day' : 'days'} ago`;
	}
};

const BlogComments = ({ blogReviews }) => {
	// Filter reviews with an approved status
	const approvedReviews = blogReviews.filter(
		(review) => review.status === 'approved'
	);

	const RESPONSE_ENUM = {
		UPVOTE: {
			label: 'upvote',
			icon: Emoji1,
		},
		LOVE: {
			label: 'love',
			icon: Emoji2,
		},
		FUNNY: {
			label: 'funny',
			icon: Emoji3,
		},
		ANGRY: {
			label: 'angry',
			icon: Emoji4,
		},
		SURPRISED: {
			label: 'surprised',
			icon: Emoji5,
		},
		SAD: {
			label: 'sad',
			icon: Emoji6,
		},
	};

	const [currentPage, setCurrentPage] = useState(1);
	const commentsPerPage = 4;

	const handlePageClick = (data) => {
		const selectedPage = data.selected;
		setCurrentPage(selectedPage + 1);
	};

	const pageCount = Math.ceil(approvedReviews.length / commentsPerPage);

	return (
		<div className="blog-comments-container">
			<h2>
				{approvedReviews.length === 0 && 'No Comments'}
				{approvedReviews.length > 0 && `${approvedReviews.length} Comments`}
			</h2>

			{approvedReviews.length > 0 &&
				approvedReviews
					.slice(
						(currentPage - 1) * commentsPerPage,
						currentPage * commentsPerPage
					)
					.map((review, index) => (
						<div key={index} className="blog-comment">
							<div className="comment-container">
								<div className="comment-user-img">
									<img
										className="user-img"
										src={Image}
										alt="comment-user-img"
									/>
								</div>
								<div className="comment-contents">
									<div className="name-date-wrapper">
										<div className="comment-author">{review.name}</div>
										<div className="comment-date">
											{getTimeDifference(review.createdAt)}
										</div>
									</div>
									<div className="comment-text">{review.comment}</div>
									<div className="comment-reaction">
										Reaction:
										<span>
											<img
												src={RESPONSE_ENUM[review.response.toUpperCase()].icon}
												alt={RESPONSE_ENUM[review.response.toUpperCase()].label}
												className="comment-emoji"
											/>
										</span>
										<span className="comment-label">{review.response}</span>
									</div>
								</div>
							</div>
						</div>
					))}

			{pageCount > 1 && (
				<ReactPaginate
					previousLabel="Prev"
					nextLabel="Next"
					breakLabel="..."
					onPageChange={handlePageClick}
					pageRangeDisplayed={5}
					marginPagesDisplayed={2}
					pageCount={pageCount}
					containerClassName={'pagination'}
					pageClassName={'pagination__link'}
					disabledClassName={'pagination__link--disabled'}
					activeClassName={'pagination__link--active'}
					nextClassName={'pagination__link--next'}
					previousClassName={'pagination__link--prev'}
					forcePage={currentPage - 1} // Zero-based index for forcePage
				/>
			)}
		</div>
	);
};

export default BlogComments;
