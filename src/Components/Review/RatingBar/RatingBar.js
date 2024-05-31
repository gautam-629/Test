import React from 'react';
import './RatingBar.css';

function Star({ filled }) {
	return <span className={`star ${filled ? 'filled' : ''}`}>&#9733;</span>;
}
const RatingBar = ({ rating }) => {
	// The 'rating' prop determines the current rating value

	return (
		<div className="rating-bar">
			{[1, 2, 3, 4, 5].map((star) => (
				<Star
					key={star}
					filled={star <= rating} // Check if the star should be filled
				/>
			))}
		</div>
	);
};

export default RatingBar;
