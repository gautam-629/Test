import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import './Testimonial.css';
import SlidePrevButton from './Sliders/SlidePrevButton';
import SlideNextButton from './Sliders/SlideNextButton';
import quote from '../../../Assets/Testimonials/quotes.png';
import { getFileUrl } from '../../../utils/imageURL';
import { removeHtml } from '../../../utils/removeHtml';

const Testimonial = ({ testimonials, homeCMS }) => {
	const [, setSwiperInit] = useState(false);
	const PrevRef = useRef(null);
	const NextRef = useRef(null);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const breakpoints = {
		320: { slidesPerView: 2, spaceBetween: 0 },
		768: { slidesPerView: 3, spaceBetween: 20 },
		1024: { slidesPerView: 3, spaceBetween: 0 },
		1440: { slidesPerView: 3, spaceBetween: 10 },
	};

	const defaultTestimonial = testimonials?.find(
		(testimonial) => testimonial?.isDefault && testimonial?.service === null
	);
	const otherTestimonials = testimonials?.filter(
		(testimonial) => !testimonial?.isDefault && testimonial?.service === null
	);

	return (
		<div className="testimonial-wrapper fixSection">
			<div className="t-left-wrapper">
				<img
					src={getFileUrl(defaultTestimonial?.image)}
					alt="Default image"
					className="background__Image"
				/>
				<div className="testimonial__Default">
					<div className="title__Testimonials">
						<div className="titleSub-white">{homeCMS?.[24]?.title}</div>
						<div className="titleMain-white testimonialTitle__Desc">
							{removeHtml(homeCMS?.[24]?.description)}
						</div>
						<div className="quote-img-wrapper">
							<img src={quote} alt="quote image" />
						</div>
					</div>
					<div className="t-left-desc">{defaultTestimonial?.description}</div>
					<span className="divider"></span>
					<div className="t-sign">
						<div className="t-left-heading">{defaultTestimonial?.name}</div>
						<div className="t-subtitle">{defaultTestimonial?.companyName}</div>
					</div>
				</div>
			</div>

			<div className="t-right-wrapper">
				<Swiper
					direction={'vertical'}
					navigation={{ prevEl: PrevRef.current, nextEl: NextRef.current }}
					breakpoints={breakpoints}
					modules={[Navigation]}
					onInit={() => setSwiperInit(true)}
					className="custom-swiper"
					noSwiping={isMobile} // Disable swiping for mobile devices
					noSwipingClass="swiper-no-swiping" // Add class to disable swiping
				>
					{otherTestimonials?.map((testimonial) => (
						<SwiperSlide key={testimonial?.id}>
							<div className="t-row">
								<div className="t-desc">{testimonial?.description}</div>
								<div className="t-content">
									{testimonial?.image ? (
										<span className="t-img-wrapper">
											<img
												src={getFileUrl(testimonial?.image)}
												alt="person icon"
											/>
										</span>
									) : (
										<span className="t-img-wrapper default-person"></span>
									)}
									<div className="t-bt-content">
										<div className="t-heading">{testimonial?.name}</div>
										<div className="t-subheading">
											{testimonial?.companyName}
										</div>
									</div>
								</div>
							</div>
						</SwiperSlide>
					))}
					<div className="btn-container">
						<SlidePrevButton Ref={PrevRef} />
						<SlideNextButton Ref={NextRef} />
					</div>
				</Swiper>
			</div>
		</div>
	);
};

export default Testimonial;
