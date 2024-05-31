import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import slick carousel styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

// import swiper slider styles
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import './Services.css';

import { getFileUrl } from '../../utils/imageURL';
import { removeHtml } from '../../utils/removeHtml';

const Services = ({ services, homeCMS, service }) => {
	const [, setSwiperInit] = useState(false);

	const navigate = useNavigate();

	const navigateToServices = (slug) => {
		window.scrollTo(0, 0);
		navigate(`/${slug}`);
	};

	const renderSubHeading = () => {
		if (service?.serviceSubHeading || service?.serviceSubHeading === '') {
			return service?.serviceSubHeading;
		} else {
			return homeCMS?.[8]?.title;
		}
	};

	const renderHeading = () => {
		if (service?.serviceHeading || service?.serviceHeading === '') {
			return service?.serviceHeading;
		} else {
			return removeHtml(homeCMS?.[8]?.description);
		}
	};
	const settings = {
		dots: true,
		adaptiveHeight: false,
		variableWidth: false,
		infinite: false,
		speed: 500,
		slidesToShow: 3,
		rows: 2,
		// slidesPerRow: 3,
		slidesToScroll: 1,
		dotsClass: 'button__bar',
		responsive: [
			{
				breakpoint: 1024,
				settings: { slidesToShow: 2 },
			},
			{
				breakpoint: 768,
				settings: {
					rows: 2,
					slidesToShow: 2,
					// slidesPerRow: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					rows: 2,
					slidesToShow: 1,
					// slidesPerRow: 1,
				},
			},
		],
	};

	const slideStyle = {
		minHeight: '220px',
	};

	return (
		<>
			<div className="services-wrapper">
				<div className="s-wrapper">
					<div className="title__Services">
						{/* <div className="titleSub">{homeCMS?.[8]?.title}</div> */}
						<div className="titleSub">{renderSubHeading()}</div>
						{/* <div className="titleMain titleMain__Services">
							{removeHtml(homeCMS?.[8]?.description)}
						</div> */}
						<div className="titleMain titleMain__Services">
							{renderHeading()}
						</div>
					</div>
				</div>

				<Slider {...settings} className="service-slider">
					{services?.map((service) => {
						return (
							<div key={service.id} style={slideStyle}>
								<div
									className="s-col selector"
									style={slideStyle}
									onClick={() => navigateToServices(service?.slug)}
								>
									<div className="s-image-wrapper">
										<img
											src={getFileUrl(service?.icon)}
											className="boost__icons"
											alt="card-image"
										/>
									</div>
									<div className="s-col-title">{service?.title}</div>
									<div className="s-desc service-truncated-text">
										{removeHtml(service?.shortDescription)}
									</div>
								</div>
							</div>
						);
					})}
				</Slider>
			</div>
		</>
	);
};

export default Services;
