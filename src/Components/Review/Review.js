import React from 'react';
import { useQuery } from 'react-query';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import './Review.css';

import { formatDistance } from 'date-fns';

import { LoadingSpinner } from '../../Components';

import { removeHtml } from '../../utils/removeHtml';

// services
import { getReviews } from '../../services/home/home.services';
import { getFileUrl } from '../../utils/imageURL';
import RatingBar from './RatingBar/RatingBar';

const DEFAULT_PAGE_SIZE = 4;

const Review = ({ homeCMS }) => {
	// Queries
	const { data: reviews, isLoading: reviewsLoading } = useQuery('reviews', () =>
		getReviews(0, DEFAULT_PAGE_SIZE)
	);

	if (reviewsLoading) {
		return <LoadingSpinner />;
	}

	const breakpoints = {
		// when window width is >= 320px
		320: {
			slidesPerView: 1,
			spaceBetween: 5,
		},
		400: {
			slidesPerView: 1,
			spaceBetween: 40,
		},
		// when window width is >= 768px
		768: {
			slidesPerView: 2,
			spaceBetween: 30,
		},
		1024: {
			slidesPerView: 3,
			spaceBetween: 30,
		},
		1440: {
			slidesPerView: 4,
			spaceBetween: 30,
		},
	};

	return (
		<section className="fixSection">
			<div className="review-wrapper">
				<div className="title">
					<div className="titleSub">{homeCMS?.[25]?.title}</div>
					<div className="titleMain">
						{removeHtml(homeCMS?.[25]?.description)}
					</div>
				</div>
				<div className="review-content">
					{/* Slider */}
					<Swiper
						autoplay={{
							delay: 2500,
							disableOnInteraction: false,
						}}
						// pagination={{ clickable: true }}
						breakpoints={breakpoints}
						modules={[Autoplay, Pagination]}
						className="reviewRow-swiper"
						// freeMode={true}
					>
						{reviews.map((review) => {
							// console.log('prev date', review?.reviewDate);
							const formattedDate = formatDistance(
								new Date(review?.reviewDate),
								new Date(),
								{
									addSuffix: true,
								}
							);

							return (
								<SwiperSlide key={review.id}>
									<div className="reviewCard">
										<div className="r-image-wrapper">
											<RatingBar rating={review?.rating} />
											<span className="reviewCard__Date">{formattedDate}</span>
										</div>
										<div className="reviewDescription">
											<div className="r-Heading">{review.title}</div>
											<div className="r-desc review-truncated-text">
												{review.description}
											</div>
										</div>
										<div className="r-divider"></div>
										<div className="r-bottom-wrapper">
											<img src={getFileUrl(review.image)} alt="company logo" />
											{/* <span className="r-company">company</span> */}
										</div>
									</div>
								</SwiperSlide>
							);
						})}
					</Swiper>
				</div>
			</div>
		</section>
	);
};

export default Review;
