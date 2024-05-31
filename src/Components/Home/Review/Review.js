import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './Review.css';

import Rating from '../../Assets/Review/rating.png';
import TrustPilot from '../../Assets/Review/trustpilot-logo.png';
import Google from '../../Assets/Review/google-logo.png';
import Upwork from '../../Assets/Review/upwork-logo.png';
import Crowd from '../../Assets/Review/crowd-logo.png';

const columns = [
	{
		id: 1,
		rating: Rating,
		title: 'Best on the market',
		description:
			'Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum ad ipisci ngadi p iscinga dipiscing Forem ipsum dolor sit amet, consectetu ....',
		image: TrustPilot,
		company: 'TrustPilot',
		time: '2 days ago',
	},
	{
		id: 2,
		rating: Rating,
		title: 'Best on the market',
		description:
			'Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum ad ipisci ngadi p iscinga dipiscing Forem ipsum dolor sit amet, consectetu ....',
		image: Google,
		company: 'Google',
		time: '2 days ago',
	},
	{
		id: 3,
		rating: Rating,
		title: 'Best on the market',
		description:
			'Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum ad ipisci ngadi p iscinga dipiscing Forem ipsum dolor sit amet, consectetu ....',
		image: Upwork,
		company: '',
		time: '2 days ago',
	},
	{
		id: 4,
		rating: Rating,
		title: 'Best on the market',
		description:
			'Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum ad ipisci ngadi p iscinga dipiscing Forem ipsum dolor sit amet, consectetu ....',
		image: Crowd,
		company: 'G2.com',
		time: '2 days ago',
	},
	{
		id: 5,
		rating: Rating,
		title: 'Best on the market',
		description:
			'Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum ad ipisci ngadi p iscinga dipiscing Forem ipsum dolor sit amet, consectetu ....',
		image: TrustPilot,
		company: 'TrustPilot',
		time: '2 days ago',
	},
];

const Review = () => {
	const breakpoints = {
		// when window width is >= 320px
		320: {
			slidesPerView: 1,
			spaceBetween: 10,
		},
		// when window width is >= 768px
		768: {
			slidesPerView: 2,
			spaceBetween: 30,
		},
		1024: {
			slidesPerView: 3,
			spaceBetween: 50,
		},
		1440: {
			slidesPerView: 4,
			spaceBetween: 50,
		},
	};

	return (
		<div className="review-wrapper">
			<div className="title">
				<div className="top-title">Reviews</div>
				<div className="main-title">All Verified Reviews</div>
			</div>
			<div className="review-content">
				{/* Slider */}
				<Swiper autoHeight={true} breakpoints={breakpoints}>
					{columns.map((column) => (
						<SwiperSlide key={column.id}>
							<div className="r-col">
								<div className="r-image-wrapper">
									<img src={column.rating} alt="rating icon" />
									<span>{column.time}</span>
								</div>
								<div className="description">
									<div className="r-Heading">{column.title}</div>
									<div className="r-desc">{column.description}</div>
								</div>
								<div className="r-divider"></div>
								<div className="r-bottom-wrapper">
									<img src={column.image} alt="company logo" />
									<span className="r-company">{column.company}</span>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};

export default Review;
