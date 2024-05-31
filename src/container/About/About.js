import React from 'react';
import { useQuery } from 'react-query';
import './About.css';

import { Booking, Gallery, LoadingSpinner } from '../../Components';

// import DotGroup from '../../Assets/Services/Group 24.png';

import { Helmet } from 'react-helmet-async';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

//servicesf
import { getTeam } from '../../services/about/about.services';
import { getCMS, getCMSPageName } from '../../services/home/home.services';
import { getFileUrl } from '../../utils/imageURL';
import { removeHtml } from '../../utils/removeHtml';
import htmlParser from '../../utils/htmlParser';
import Image from 'next/image';
import DotGroup from '../../Assets/Services/DotGroup';

const DEFAULT_PAGE_SIZE = 4;
const about_slug = 'about-page';
const contact_slug = 'contact-page';

const About = () => {
	//Queries
	const { data: team, isLoading: teamLoading } = useQuery('our-team', () =>
		getTeam(0, DEFAULT_PAGE_SIZE)
	);
	const { data: aboutCMS, isLoading: aboutCMSLoading } = useQuery(
		['about-cms', about_slug],
		() => getCMS(about_slug, DEFAULT_PAGE_SIZE)
	);
	const { data: contactCMS, isLoading: contactCMSLoading } = useQuery(
		['contact-cms', contact_slug],
		() => getCMS(contact_slug, DEFAULT_PAGE_SIZE)
	);
	const { data: pageNameCMS, isLoading: pageNameCMSLoading } = useQuery(
		['cms-pageName', about_slug],
		() => getCMSPageName(about_slug, DEFAULT_PAGE_SIZE)
	);

	if (
		teamLoading ||
		aboutCMSLoading ||
		contactCMSLoading ||
		pageNameCMSLoading
	) {
		return <LoadingSpinner />;
	}

	const features = aboutCMS.slice(1, 5);
	const columns = aboutCMS.slice(5, 8);
	// const awards = aboutCMS.slice(15, 25);
	const stats = aboutCMS.slice(9, 13);

	// console.log('stats', stats);

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

	const statsSettings = {
		dots: true,
		adaptiveHeight: false,
		variableWidth: false,
		infinite: false,
		speed: 500,
		slidesToShow: 3,
		rows: 1,
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
					rows: 1,
					slidesToShow: 2,
					// slidesPerRow: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					rows: 1,
					slidesToShow: 1,
					// slidesPerRow: 1,
				},
			},
		],
	};

	return (
		<>
			<Helmet>
				<title>{`${pageNameCMS?.title} | HumanX | BPO and IT Outsourcing `}</title>
				<meta
					name="description"
					content={`${pageNameCMS?.title} | HumanX | BPO and IT Outsourcing `}
				/>
				<link rel="canonical" href="/about" />
			</Helmet>
			{/* Partner Section */}
			<section className="pt-mainWrapper">
				<div className="bgSection__blue">
					<div className="fixSection">
						<div className=" pt-wrapper">
							<div className="pt-left-wrapper">
								<div className="pt__dotGroup">
									<DotGroup />
									<DotGroup />
								</div>
								<img
									src={getFileUrl(aboutCMS?.[0]?.image)}
									className="background__Image"
									alt="about image"
								/>
							</div>
							<div className="pt-right-wrapper">
								<div className="title">
									<div className="titleSub">{aboutCMS?.[15]?.title}</div>
									<div className="pt-main-title">{aboutCMS?.[0]?.title}</div>
									<div className="pt-desc">
										{htmlParser(aboutCMS?.[0]?.description)}
									</div>
								</div>
								<div className="pt-content">
									{features.map((feature) => (
										<div className="pt-row" key={feature.title}>
											<div className="pt-img-wrapper">
												<img src={getFileUrl(feature.image)} alt="tick image" />
											</div>
											<div className="pt-innerContent">
												<div className="pt-heading">{feature.title}</div>
												<div className="pt-subHeading">
													{removeHtml(feature.description)}
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Who We Are Section */}
			<section className="fixSection">
				<div className="b-container">
					{columns.map((column) => (
						<div className="b-col" key={column.id}>
							<img src={getFileUrl(column.image)} className="banner__icons" />
							<div className="b-heading">{column.title}</div>
							<div className="b-subHeading">
								{removeHtml(column.description)}
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Vision Section */}
			<section className="visionSection">
				<div className="fixSection">
					<div className="vision-wrapper">
						<div className="v-left-wrapper">
							<div className="title">
								<div className="titleSub">Our Vision</div>
								<div className="titleMain titleVision">
									{aboutCMS?.[8]?.title}
								</div>
								<div className="v-subTitle">
									{htmlParser(aboutCMS?.[8]?.description)}
								</div>
							</div>
						</div>
						<div className="values__Img">
							<img
								src={getFileUrl(aboutCMS?.[8]?.image)}
								className="background__Image"
								alt="vision image"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Stats Banner Section */}
			<section className="bannerSection">
				<div className="fixSection">
					<div className="stats-wrapper">
						<div className="stats-content">
							{stats.map((stat) => (
								<div className="stats-col" key={stat.id}>
									<div className="stats-heading">{stat.title}</div>
									<div className="stats-subHeading">
										{removeHtml(stat.description)}
									</div>
								</div>
							))}
						</div>
						{/* <div className="stats-img-wrapper">
							<Slider {...statsSettings}>
								{awards?.map((award) => (
									<span key={award.id} className="stat-image">
										<img src={getFileUrl(award?.image)} alt="award image" />
									</span>
								))}
							</Slider>
						</div> */}
					</div>
				</div>
			</section>

			{/* Team Section */}
			<section className="fixSection">
				<div className="tm-wrapper">
					<div className="title">
						<div className="titleSub">{aboutCMS?.[13]?.title}</div>
						<div className="titleMain">
							{removeHtml(aboutCMS?.[13]?.description)}
						</div>
					</div>
					<div className="tm-content">
						<Slider {...settings} className="team-slider">
							{team.map((member) => (
								<div className="team-col" key={member.id}>
									<div className="tm-img-wrapper">
										<img
											src={getFileUrl(member?.image)}
											alt="team image"
											className="img-team"
										/>
									</div>
									<div className="tm-heading">{member.name}</div>
									<span className="tm-subHeading">
										{removeHtml(member?.designation)}
									</span>
								</div>
							))}
						</Slider>
					</div>
				</div>
			</section>

			{/* Gallery Section */}
			<section className="fixSection">
				<Gallery aboutCMS={aboutCMS} />
			</section>

			{/* Booking Section */}
			<Booking contactCMS={contactCMS} />
		</>
	);
};

export default About;
