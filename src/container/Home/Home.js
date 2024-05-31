import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';

// swiper css styles
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Pagination } from 'swiper/modules';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './Home.css';
import {
	About,
	Testimonial,
	Review,
	Booking,
	LoadingSpinner,
	Services,
} from '../../Components';

import bannerImage1 from '../../Assets/Home/hero-bg.png';
import bannerImage2 from '../../Assets/Home/hero-bg.png';
import bannerImage3 from '../../Assets/Home/hero-bg.png';

import { LiaCalendarAltSolid } from 'react-icons/lia';
import { Helmet } from 'react-helmet-async';
import { AiOutlineRight } from 'react-icons/ai';

//services
import {
	getTestimonials,
	getServices,
	getCMS,
	getCMSPageName,
} from '../../services/home/home.services';
import { getSiteSettings } from '../../services/site-settings/site-settings.services';
import { getFirstBlog } from '../../services/blog/blog.services';
import { getGallery } from '../../services/about/about.services';

// utils
import { getFileUrl } from '../../utils/imageURL';
import { removeHtml } from '../../utils/removeHtml';
import { getService } from '../../services/services/services.services';
import { BsWindowSidebar } from 'react-icons/bs';

const DEFAULT_PAGE_SIZE = 4;
const first_blog = 1;
const home_slug = 'home-page';
const number_slug = 'numbers-page';
const blog_slug = 'blogs-page';
const contact_slug = 'contact-page';
// const slug = 'digital-marketing';
const slug = 'homebanner';

const Home = () => {
	const navigate = useNavigate();

	const showFullDescription = false;

	// navigate to /blogs
	const navigateToBlogs = () => {
		window.scrollTo(0, 0);
		navigate('/blogs');
	};

	// navigate to Blog
	const navigateToBlog = (slug) => {
		window.scrollTo(0, 0);
		navigate(`/blog-detail/${slug}`);
	};

	const navigateToContact = () => {
		window.scrollTo(0, 0);
		navigate('/contact-us');
	};

	const scrollToServices = () => {
		const servicesSection = document.getElementById('servicesSection');

		if (servicesSection) {
			window.scrollTo({
				top: servicesSection.offsetTop,
				behavior: 'smooth', // for smooth scrolling
			});
		}
	};

	const navigateToAbout = () => {
		window.scrollTo(0, 0);
		navigate('/about');
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
	const { data: siteSettings, isLoading: siteSettingsLoading } = useQuery(
		'site-settings',
		() => getSiteSettings()
	);
	const { data: homeCMS, isLoading: homeCMSLoading } = useQuery(
		['home-cms', home_slug],
		() => getCMS(home_slug, DEFAULT_PAGE_SIZE)
	);
	const { data: blog, isLoading: blogLoading } = useQuery('blogs', () =>
		getFirstBlog(0, first_blog)
	);
	const { data: numbers, isLoading: numbersLoading } = useQuery(
		['numbers', number_slug],
		() => getCMS(number_slug, DEFAULT_PAGE_SIZE)
	);
	const { data: blogCMS, isLoading: blogCMSLoading } = useQuery(
		['blog-cms', blog_slug],
		() => getCMS(blog_slug, DEFAULT_PAGE_SIZE)
	);
	const { data: contactCMS, isLoading: contactCMSLoading } = useQuery(
		['contact-cms', contact_slug],
		() => getCMS(contact_slug, DEFAULT_PAGE_SIZE)
	);
	const { data: pageNameCMS, isLoading: pageNameCMSLoading } = useQuery(
		['cms-pageName', home_slug],
		() => getCMSPageName(home_slug, DEFAULT_PAGE_SIZE)
	);
	const { data: gallery, isLoading: galleryLoading } = useQuery(
		['gallery', slug],
		() => getGallery(slug, DEFAULT_PAGE_SIZE)
	);

	if (
		testimonialsLoading ||
		servicesLoading ||
		siteSettingsLoading ||
		homeCMSLoading ||
		blogLoading ||
		numbersLoading ||
		blogCMSLoading ||
		contactCMSLoading ||
		pageNameCMSLoading ||
		galleryLoading
	) {
		return <LoadingSpinner />;
	}

	// console.log('gallery', gallery);
	// console.log('galleryimage', gallery._images);
	// console.log("image" , image);

	const companies = homeCMS?.slice(2, 8);

	const words = removeHtml(homeCMS?.[13].description).split(' ');

	// word limitation
	const wordCount = 68;

	const wordCountToDisplay = showFullDescription ? words.length : wordCount;

	const limitedDescription = words.slice(0, wordCountToDisplay).join(' ');

	const isTruncated = words.length > wordCount;

	const pagination = {
		clickable: true,
		renderBullet: function (index, className) {
			return '<span class="' + className + '">' + '</span>';
		},
	};

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	const bannerImages = [
		{ image: bannerImage1 },
		{ image: bannerImage2 },
		{ image: bannerImage3 },
	];

	return (
		<>
			<Helmet>
				<title>HumanX Global | A Leading BPO and IT Outsourcing Company</title>
				<meta
					property="og:title"
					content="HumanX Global | A Leading BPO and IT Outsourcing Company"
				/>
				<meta
					name="description"
					content="HumanX is a leading BPO and IT outsourcing company, enabling organizational innovation and growth through advanced outsourcing and technology services."
				/>
				<meta
					property="og:image"
					content="https://api.humanxglobal.com//uploads/2024-02/unauth-1708426433269-3b37b33b4c4f449da8972a8a8c438661.png"
				/>
				<meta
					property="og:description"
					content="HumanX Global | A Leading BPO and IT Outsourcing Company"
				/>
				<meta property="og:type" content="website" />
				<meta property="og:url" content={window.location.href} />
				<link rel="canonical" href="/" />
			</Helmet>

			{/* Hero Section */}

			<section className="">
				<div className="n-container">
					<section>
						<div className="bg-content ">
							<h1 className="intro-heading">{homeCMS?.[0]?.title}</h1>
							<p className="sub-title">
								{removeHtml(homeCMS?.[0]?.description)}
							</p>
							<div className="button-group">
								<button
									className="button-primary btn-flex button-hover-primary"
									onClick={navigateToContact}
								>
									Schedule a meeting
								</button>
								<button
									className="button-transparent btn-flex button-hover-white"
									onClick={scrollToServices}
								>
									Our Services
								</button>
							</div>
						</div>
					</section>
					<Swiper {...settings} pagination={pagination} modules={[Pagination]}>
						{gallery._images.map((image, index) => (
							<SwiperSlide key={index}>
								<img
									src={getFileUrl(image)}
									className="background__Image"
									alt="hero image"
								/>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</section>

			{/* Company Section */}
			<section className="bannerSection">
				<div id="outsourcing" className="c-wrapper fixSection">
					<div className="c-heading">{homeCMS?.[1]?.title}</div>
					<Swiper
						slidesPerView={4}
						autoplay={{
							delay: 2000,
							disableOnInteraction: false,
						}}
						modules={[Autoplay]}
						className="company-swiper"
					>
						<div className="company-wrapper">
							{companies.map((company) => (
								<SwiperSlide key={company.id}>
									<div className="company">
										<img src={getFileUrl(company.image)} alt="company image" />
									</div>
								</SwiperSlide>
							))}
						</div>
					</Swiper>
				</div>
			</section>

			{/* Services Section */}
			<section id="servicesSection" className="fixSection">
				<Services services={services} homeCMS={homeCMS} />
			</section>

			{/* About Section */}
			<section className="bgSection__blue">
				<div className="fixSection">
					<About homeCMS={homeCMS} />
				</div>
			</section>

			{/* Messages Section */}
			<section>
				<div
					style={{
						backgroundImage: `url(${getFileUrl(homeCMS?.[13]?.image)})`,
						backgroundAttachment: 'fixed',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
					}}
				>
					<div className="message-wrapper fixSection">
						<div className="message-title">
							<div className="titleSub-white">Messages</div>
							<div className="titleMain-white">{homeCMS?.[13]?.title}</div>
							<div className="message__Desc">
								{isTruncated ? (
									<>
										{limitedDescription}....
										<button className="button-text" onClick={navigateToAbout}>
											Read More
										</button>
									</>
								) : (
									removeHtml(homeCMS?.[13].description)
								)}
							</div>
							<div className="m-divider"></div>
							<div className="m-wrapper">
								<span className="person-icon">
									<img
										src={getFileUrl(homeCMS?.[14]?.image)}
										alt="person icon"
									/>
								</span>
								<div className="m-content">
									<div className="m-heading">{homeCMS?.[14]?.title}</div>
									<div className="m-subheading">
										{removeHtml(homeCMS?.[14]?.description)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Stats Banner Section */}
			<section className="bannerSection">
				<section className="fixSection">
					<div className="stats ">
						{numbers.map((stat) => (
							<div className="stats__col" key={stat.id}>
								<div className="stats__col__title">{stat.title}</div>
								<div className="stats__col__titleSub">
									{removeHtml(stat.description)}
								</div>
							</div>
						))}
					</div>
				</section>
			</section>

			{/* Values Section */}
			<section className="fixSection">
				<div className="values-wrapper">
					<div className="v-left-container">
						<div>
							<img
								src={getFileUrl(homeCMS?.[16]?.image)}
								className="values__image"
								alt="values image"
							/>
						</div>
						<div className="value__Row value__secRow">
							<div className="value__wrapper">
								<div className="value__Logo">
									<img
										src={getFileUrl(homeCMS?.[17]?.image)}
										className="values__logo"
										alt="logo image"
									/>
								</div>
							</div>
							<div className="value__wrapper">
								<img
									src={getFileUrl(homeCMS?.[18]?.image)}
									className="values__image"
									alt="values image"
								/>
							</div>
						</div>
						<div className="value__Row value__lastRow">
							<div className="value__BottomCol">
								<img
									src={getFileUrl(homeCMS?.[19]?.image)}
									className="values__image"
									alt="values image"
								/>
							</div>
							<div className="value__BottomCol">
								<img
									src={getFileUrl(homeCMS?.[20]?.image)}
									className="values__image"
									alt="values image"
								/>
							</div>
						</div>
					</div>
					<div className="v-right-container">
						<div className="title__Values">
							<div className="titleSub">Our Core Values</div>
							<div className="titleMain">{homeCMS?.[15]?.title}</div>
						</div>
						<div className="v-content">
							<div className="v-right-row row-first">
								<div className="v-img-wrapper">
									<img src={getFileUrl(homeCMS?.[21]?.image)} alt="icon" />
								</div>
								<div className="v-innerRow">
									<div className="heading">{homeCMS?.[21]?.title}</div>
									<div className="v-desc">
										{removeHtml(homeCMS?.[21]?.description)}
									</div>
								</div>
							</div>
							<div className="v-right-row">
								<div className="v-img-wrapper">
									<img src={getFileUrl(homeCMS?.[22]?.image)} alt="icon" />
								</div>
								<div className="v-innerRow">
									<div className="heading">{homeCMS?.[22]?.title}</div>
									<div className="v-desc">
										{removeHtml(homeCMS?.[22]?.description)}
									</div>
								</div>
							</div>
							<div className="v-right-row">
								<div className="v-img-wrapper">
									<img src={getFileUrl(homeCMS?.[23]?.image)} alt="icon" />
								</div>
								<div className="v-innerRow">
									<div className="heading">{homeCMS?.[23]?.title}</div>
									<div className="v-desc">
										{removeHtml(homeCMS?.[23]?.description)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Testimonial Section */}
			<section className="bgSection__blue">
				<Testimonial testimonials={testimonials} homeCMS={homeCMS} />
			</section>

			{/* Reviews Section */}
			<Review homeCMS={homeCMS} />

			{/* Contact Section */}
			<section>
				<div className="contact-wrapper fixSection">
					<div className="contact-background">
						<div className="c-left-wrapper">
							<div className="title">
								<div className="c-title">Contact</div>
								<div className="main-title">{homeCMS?.[26]?.title}</div>
							</div>
						</div>
						<div className="c-right-wrapper">
							<div className="c-row">
								<div className="c-Heading">{siteSettings?.officeName}</div>
								<div className="c-num">{siteSettings?.phone}</div>
								<div className="c-desc">{siteSettings?.address}</div>
							</div>
							<div className="c-row">
								<div className="c-Heading">{siteSettings?.officeName2}</div>
								<div className="c-num">{siteSettings?.phone2}</div>
								<div className="c-desc">{siteSettings?.address2}</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Delivery Sites Section */}
			<section className="delivery fixSection">
				<div className="op-wrapper ">
					<div className="title__Delivery ">
						<div className="titleSub">{homeCMS?.[27]?.title}</div>
						<div className="titleMain titleMain__Delivery">
							{removeHtml(homeCMS?.[27]?.description)}
						</div>
					</div>

					<div className="op-background">
						<img
							src={getFileUrl(homeCMS?.[27]?.image)}
							className="background__Image"
							alt="world map"
						/>
					</div>
				</div>
			</section>

			{/* Blog Section */}
			<section className="bgSection__blue">
				<section className="fixSection">
					<div className="blog-wrapper ">
						<div className="title__Blog">
							<div className="titleSub">Blogs</div>
							<div className="titleMain titleMain__Blog">
								{blogCMS?.[0]?.title}
							</div>
							<div className="blog-desc">
								{removeHtml(blogCMS?.[0]?.description)}
							</div>
							<div className="btn-blog-wrapper">
								<button
									className="button button-primary button-hover-primary"
									onClick={navigateToBlogs}
								>
									View All Blogs
								</button>
							</div>
						</div>

						<div
							className="rt-blog-wrapper selector"
							onClick={() => navigateToBlog(blog?.[0]?.slug)}
						>
							<div className="blogCard__Image">
								<img
									src={getFileUrl(blog?.[0]?.image)}
									className="background__Image__Blog"
									alt="blog image"
								/>
							</div>
							<div className="image-caption">
								<div className="icons-wrapper">
									<div className="icon-wrapper">
										<LiaCalendarAltSolid />
										<span>{blog?.[0]?.publishedDate}</span>
									</div>
								</div>
								<div className="blog-subTitle">{blog?.[0]?.title}</div>
								<div className="blog-subText truncated-text">
									{/* {removeHtml(blog?.[0]?.description)} */}
								</div>
							</div>
						</div>
					</div>
				</section>
			</section>

			{/* Booking Section */}
			<Booking contactCMS={contactCMS} />
		</>
	);
};

export default Home;
