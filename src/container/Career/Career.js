import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';

import './Career.css';

import { Booking, Gallery, LoadingSpinner } from '../../Components';

import { Helmet } from 'react-helmet-async';

// services
import { getCMS, getCMSPageName } from '../../services/home/home.services';
import {
	getCareers,
	getCareerCategories,
} from '../../services/career/career.services';

import { removeHtml } from '../../utils/removeHtml';
import { getFileUrl } from '../../utils/imageURL';

const DEFAULT_PAGE_SIZE = 5;

const Career = () => {
	const [selectedTab, setSelectedTab] = useState('All Jobs'); // Initialize with all as the default tab

	const navigate = useNavigate();

	const career_slug = 'career-page';
	const about_slug = 'about-page';
	const services_slug = 'services-page';
	const contact_slug = 'contact-page';

	// Queries
	const { data: allCareers, isLoading: careerLoading } = useQuery(
		'careers',
		() => getCareers(0, DEFAULT_PAGE_SIZE)
	);
	const { data: careerCategories, isLoading: careerCategoriesLoading } =
		useQuery('career-category', () =>
			getCareerCategories(0, DEFAULT_PAGE_SIZE)
		);
	const { data: careerCMS, isLoading: careerCMSLoading } = useQuery(
		['career-cms', career_slug],
		() => getCMS(career_slug, DEFAULT_PAGE_SIZE)
	);
	const { data: aboutCMS, isLoading: aboutCMSLoading } = useQuery(
		['about-cms', about_slug],
		() => getCMS(about_slug, DEFAULT_PAGE_SIZE)
	);
	const { data: servicesCMS, isLoading: servicesCMSLoading } = useQuery(
		['services-cms', services_slug],
		() => getCMS(services_slug, DEFAULT_PAGE_SIZE)
	);
	const { data: contactCMS, isLoading: contactCMSLoading } = useQuery(
		['contact-cms', contact_slug],
		() => getCMS(contact_slug, DEFAULT_PAGE_SIZE)
	);
	const { data: pageNameCMS, isLoading: pageNameCMSLoading } = useQuery(
		['cms-pageName', career_slug],
		() => getCMSPageName(career_slug, DEFAULT_PAGE_SIZE)
	);

	if (
		careerLoading ||
		careerCategoriesLoading ||
		careerCMSLoading ||
		aboutCMSLoading ||
		servicesCMSLoading ||
		contactCMSLoading ||
		pageNameCMSLoading
	) {
		return <LoadingSpinner />;
	}

	const selectedCareers =
		selectedTab === 'All Jobs'
			? allCareers
			: allCareers.filter((career) => career.category === selectedTab);

	const values = servicesCMS.slice(7, 13);

	const handleTabClick = (tab) => {
		setSelectedTab(tab);
	};

	// navigate to Career Detail Page
	const navigateToCareerDetail = (slug) => {
		window.scrollTo(0, 0);
		navigate(`/career-detail/${slug}`);
	};

	const scrollToCareerTable = () => {
		const careerTableSection = document.getElementById('careerTable');

		if (careerTableSection) {
			window.scrollTo({
				top: careerTableSection.offsetTop,
				behavior: 'smooth', // for smooth scrolling
			});
		}
	};

	return (
		<>
			<Helmet>
				<title>{`${pageNameCMS?.title} | HumanX | BPO and IT Outsourcing`}</title>
				<meta
					name="description"
					content={`${pageNameCMS?.title} | HumanX | BPO and IT Outsourcing `}
				/>
				<link rel="canonical" href="/career" />
			</Helmet>
			{/* Career Section */}
			<section className="fixSection">
				<div className="career">
					<div className="career__left">
						<div className="titleSub">Career At HumanX</div>
						<div className="titleMain">{careerCMS?.[0]?.title}</div>
						<div className="titleDesc career__desc">
							{removeHtml(careerCMS?.[0]?.description)}
						</div>
						<div>
							<button
								className="button button-primary button-hover-primary"
								onClick={scrollToCareerTable}
							>
								See Open Positions
							</button>
						</div>
					</div>
					<div className="career__right">
						<img
							src={getFileUrl(careerCMS?.[0]?.image)}
							className="background__Image"
							alt="career image"
						/>
					</div>
				</div>
			</section>

			{/* Jobs Section */}
			<section id="careerTable" className="fixSection">
				<div className="careerTable">
					<div className="tab-buttons careerList">
						<button
							className={`careerTable__heading tab-button ${
								selectedTab === 'All Jobs' ? 'active' : ''
							}`}
							onClick={() => handleTabClick('All Jobs')}
						>
							All Jobs
						</button>
						{careerCategories?.map((careerCategory) => (
							<button
								key={careerCategory?.id}
								className={`tab-button ${
									selectedTab === careerCategory?.category ? 'active' : ''
								}`}
								onClick={() => handleTabClick(careerCategory?.category)}
							>
								{careerCategory?.category}
							</button>
						))}
					</div>

					{/* Content for Each tab */}
					<div>
						{selectedTab === 'All Jobs' &&
							// Content for the 'All Jobs' tab
							allCareers?.map((career) => (
								<div className="careerTable__Row" key={career?.id}>
									<div className="careerTable__title">{career?.title}</div>
									<div>
										<button
											className="button button-primary button-hover-primary"
											onClick={() => navigateToCareerDetail(career?.slug)}
										>
											Apply
										</button>
									</div>
								</div>
							))}

						{careerCategories?.map(
							(careerCategory) =>
								selectedTab == careerCategory?.category &&
								selectedCareers?.map((career) => (
									<div className="careerTable__Row" key={career?.id}>
										<div className="careerTable__title">{career?.title}</div>
										<div>
											<button
												className="button button-primary button-hover-primary"
												onClick={() => navigateToCareerDetail(career?.slug)}
											>
												Apply
											</button>
										</div>
									</div>
								))
						)}
					</div>
				</div>
			</section>

			{/* Work with Us Section */}
			<section className="bannerSection">
				<div className="fixSection">
					<div className="boost-career">
						<div className="boost__header">
							<div className="titleSub">{servicesCMS?.[6]?.title}</div>
							<div className="titleMain">
								{removeHtml(servicesCMS?.[6]?.description)}
							</div>
						</div>
						<div className="boost__content">
							{values.map((value) => (
								<div className="boostCard" key={value.id}>
									<img src={getFileUrl(value.image)} className="boost__icons" />
									<div className="boostCard__title">{value.title}</div>
									<div className="boostCard__desc">
										{removeHtml(value.description)}
									</div>
								</div>
							))}
						</div>
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

export default Career;
