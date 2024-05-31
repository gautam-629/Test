import React, { useState, useRef } from 'react';
import { useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './ServicesPage.css';
import {
	Services,
	Booking,
	Stats,
	LoadingSpinner,
	Boost,
} from '../../Components';
import Bottom_LeftNav from './BottomNavs/Bottom_LeftNav';
import Bottom_RightNav from './BottomNavs/Bottom_RightNav';

import { Helmet } from 'react-helmet-async';

// import Delta from 'quill-delta';

//services
import {
	getTestimonials,
	getServices,
	getCMS,
} from '../../services/home/home.services';
import {
	getApproaches,
	getService,
	getServiceStats,
	getServiceStrength,
	getValues,
} from '../../services/services/services.services';

import { getFileUrl } from '../../utils/imageURL';
import { removeHtml } from '../../utils/removeHtml';
import htmlParser from '../../utils/htmlParser';

const DEFAULT_PAGE_SIZE = 4;

const ServicesPage = () => {
	const navigate = useNavigate();
	const { id, slug } = useParams();

	const [, setSwiperInit] = useState(false);

	const prevRef = useRef(null);
	const nextRef = useRef(null);

	const home_slug = 'home-page';
	const services_slug = 'services-page';
	const contact_slug = 'contact-page';

	// navigate to contact page
	const navigateToContact = (slug) => {
		window.scrollTo(0, 0);
		navigate(`/contact-us?slug=${slug}`);
	};

	// Queries
	const { data: testimonials, isLoading: testimonialsLoading } = useQuery(
		'testimonials',
		() => getTestimonials(0, DEFAULT_PAGE_SIZE)
	);
	const { data: services, isLoading: servicesLoading } = useQuery(
		'services',
		() => getServices(0, DEFAULT_PAGE_SIZE)
	);
	const { data: homeCMS, isLoading: homeCMSLoading } = useQuery(
		['home-cms', home_slug],
		() => getCMS(home_slug, DEFAULT_PAGE_SIZE)
	);
	const { data: servicesCMS, isLoading: servicesCMSLoading } = useQuery(
		['services-cms', services_slug],
		() => getCMS(services_slug, DEFAULT_PAGE_SIZE)
	);
	const { data: approaches, isLoading: approachesLoading } = useQuery(
		['approaches', slug],
		() => getApproaches(slug, 0),
		{
			enabled: !!slug,
		}
	);
	const { data: service, isLoading: serviceLoading } = useQuery(
		['service', slug],
		() => getService(slug, 1),
		{
			enabled: !!slug,
		}
	);
	const { data: serviceStats, isLoading: serviceStatsLoading } = useQuery(
		['service-stats', slug],
		() => getServiceStats(0, slug),
		{
			enabled: !!slug,
		}
	);
	const { data: contactCMS, isLoading: contactCMSLoading } = useQuery(
		['contact-cms', contact_slug],
		() => getCMS(contact_slug, DEFAULT_PAGE_SIZE)
	);
	const { data: values, isLoading: valuesLoading } = useQuery(
		['values', slug],
		() => getValues(0, slug),
		{
			enabled: !!slug,
		}
	);
	const { data: serviceStrength, isLoading: serviceStrengthLoading } = useQuery(
		['strength-stat', slug],
		() => getServiceStrength(0, slug),
		{
			enabled: !!slug,
		}
	);

	if (
		testimonialsLoading ||
		servicesLoading ||
		homeCMSLoading ||
		servicesCMSLoading ||
		approachesLoading ||
		serviceLoading ||
		serviceStatsLoading ||
		contactCMSLoading ||
		valuesLoading ||
		serviceStrengthLoading
	) {
		return <LoadingSpinner />;
	}

	// slider breakpoints
	const breakpoints = {
		// when window width is >=320px
		320: {
			slidesPerView: 1,
			spaceBetween: 10,
		},
		// when window width is >=768px
		768: {
			slidesPerView: 2,
			spaceBetween: 10,
		},
		1024: {
			slidesPerView: 3,
			spaceBetween: 10,
		},
		1440: {
			slidesPerView: 3,
			spaceBetween: 10,
		},
	};

	const settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 4,
		initialSlide: 0,
		dotsClass: 'button__bar',
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					initialSlide: 2,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
					dots: true,
				},
			},
		],
	};

	const filteredTestimonials = testimonials?.filter(
		(testimonial) => !testimonial?.isDefault && testimonial?.service !== null
	);

	// const deltaContent = new Delta().insert(service?.description);

	console.log('service detail: ', service);

	return (
		<>
			<Helmet>
				<title>{`${service?.title} | HumanX | BPO and IT Outsourcing `}</title>
				<meta
					name="description"
					content={`${service?.title} | HumanX | BPO and IT Outsourcing `}
				/>
				<link rel="canonical" href={`/${slug}`} />
			</Helmet>
			{/* Hero Section */}
			<div className="pt-mainWrapper">
				<div
					className="bgSection__blue"
					// style={{ border: '2px solid green' }}
				>
					<div className="fixSection">
						<div className="marketing">
							<div className="marketing__left">
								<div className="titleSub">{service?.title}</div>
								<div className="titleMain">{service?.titleHeading}</div>
								<div className="titleDesc marketing__desc">
									{/* <ReactQuill
										value={service?.description}
										readOnly={true}
										theme={'bubble'}
										className="quill-text"
									/> */}
									{htmlParser(service?.description)}
									{/* <ReactQuill
									theme="bubble"
									value={service?.description}
									// value={deltaContent}
									readOnly
									modules={{ toolbar: false }}
									dangerouslySetInnerHTML={{ __html: service?.description }}
								/> */}
								</div>
								<div>
									<button
										className="button button-primary button-hover-primary"
										onClick={() => navigateToContact(service?.slug)}
										
									>
								

										Enquire Now
									</button>
								</div>
							</div>
							<div className="marketing__right">
								<img
									src={getFileUrl(service?.image)}
									className="background__Image"
									alt="services image"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Stats Banner Section */}
			{serviceStats && serviceStats.length > 0 ? (
				<section className="bannerSection">
					<div className="fixSection">
						<Stats serviceStats={serviceStats} />
					</div>
				</section>
			) : (
				''
			)}

			{/* Approach Section */}
			<section className="fixSection">
				{approaches && approaches.length > 0 ? (
					<div className="approach">
						<div className="approach__right">
							<img
								src={getFileUrl(service?.approachImage)}
								alt="background image"
								className="background__Image"
							/>
						</div>
						<div className="approach__left">
							{/* <div className="titleSub">{servicesCMS?.[13]?.title}</div> */}
							<div className="titleSub">{service?.approachSubHeading}</div>
							{/* <div className="titleMain">
								Our Approach To {service?.title} Services
							</div> */}
							<div className="titleMain">{service?.approachHeading}</div>
							{approaches?.map((approach, index) => (
								<div className="approachRow" key={approach.id}>
									<div className="approachRow__left">
										{String(index + 1).padStart(2, '0')}
									</div>
									<div className="approachRow__right">
										<div className="approachRow__title">{approach.title}</div>
										<div className="approachRow__titleSub">
											{removeHtml(approach.description)}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				) : (
					''
				)}
			</section>

			{/* Stats Banner Section */}
			{serviceStrength && serviceStrength.length > 0 ? (
				<section className="bannerSection">
					<div className="fixSection">
						<div className="quality">
							<Slider {...settings}>
								{serviceStrength.map((stat) => (
									<div className="qualityCard" key={stat.id}>
										<div className="stats-icons-div">
											<img
												src={getFileUrl(stat.image)}
												className="stats__icons"
											/>
										</div>
										<div className="qualityCard__titleMain">{stat.title}</div>
										<div className="qualityCard__title">
											{removeHtml(stat.description)}
										</div>
									</div>
								))}
							</Slider>
						</div>
					</div>
				</section>
			) : (
				''
			)}

			{/* Work with Us Section */}
			<section className="bgSection__blue">
				<div className="fixSection">
					<Boost servicesCMS={servicesCMS} values={values} service={service} />
				</div>
			</section>

			{/* Testimonials Section */}
			{filteredTestimonials && filteredTestimonials.length > 0 ? (
				<section>
					<div className="testimonial">
						<div className="titleSub">{servicesCMS?.[14]?.title}</div>
						<div className="titleMain">
							{removeHtml(servicesCMS?.[14]?.description)}
						</div>
						<div className="testimonialRow">
							{/* Slider */}
							<Swiper
								autoHeight={true}
								navigation={{
									prevEl: prevRef.current,
									nextEl: nextRef.current,
								}}
								breakpoints={breakpoints}
								modules={[Navigation]}
								onInit={() => setSwiperInit(true)}
								className="testimonialRow-swiper"
							>
								{filteredTestimonials?.map((testimonial) => (
									<SwiperSlide key={testimonial?.id}>
										<div className="testimonialCard">
											<div className="testimonialCard__desc review-truncated-text">
												{testimonial?.description}
											</div>
											<div className="testimonialCard__row">
												{/* Check if the testimonial has an image */}
												{testimonial?.image ? (
													<div className="testimonialCard__img">
														<img
															src={getFileUrl(testimonial?.image)}
															alt="person"
															className="card__img"
														/>
													</div>
												) : (
													<div className="testimonialCard__img default-person"></div>
												)}

												<div className="testimonialCard__title">
													{testimonial?.name}
													<span className="testimonialCard__titleSub">
														{testimonial?.companyName}
													</span>
												</div>
											</div>
										</div>
									</SwiperSlide>
								))}
								<div className="testimonial__btnDiv">
									<Bottom_LeftNav Ref={prevRef} />

									<Bottom_RightNav Ref={nextRef} />
								</div>
							</Swiper>
						</div>
					</div>
				</section>
			) : (
				''
			)}

			{/* Services Section */}
			<section className="fixSection">
				<Services services={services} homeCMS={homeCMS} service={service} />
			</section>

			{/* Booking Section */}
			<Booking contactCMS={contactCMS} />
		</>
	);
};

export default ServicesPage;
