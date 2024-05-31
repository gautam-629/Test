import React from 'react';
import { useQuery } from 'react-query';

import { Booking, LoadingSpinner } from '../../Components';

import './PrivacyPolicy.css';
import htmlParser from '../../utils/htmlParser';

import { Helmet } from 'react-helmet-async';

// services
import { getCMS, getCMSPageName } from '../../services/home/home.services';
import { removeHtml } from '../../utils/removeHtml';

const slug = 'privacy-policy-page';
const contact_slug = 'contact-page';
const DEFAULT_PAGE_SIZE = 4;

const PrivacyPolicy = () => {
	// Queries
	const { data: policyCMS, isLoading: policyCMSLoading } = useQuery(
		['privacy-policy', slug],
		() => getCMS(slug, DEFAULT_PAGE_SIZE)
	);
	const { data: contactCMS, isLoading: contactCMSLoading } = useQuery(
		['contact-cms', contact_slug],
		() => getCMS(contact_slug, DEFAULT_PAGE_SIZE)
	);
	const { data: pageNameCMS, isLoading: pageNameCMSLoading } = useQuery(
		['cms-pageName', slug],
		() => getCMSPageName(slug, DEFAULT_PAGE_SIZE)
	);

	if (policyCMSLoading || contactCMSLoading || pageNameCMSLoading) {
		return <LoadingSpinner />;
	}

	return (
		<>
			<Helmet>
				<title>{`${pageNameCMS?.title} | HumanX | BPO and IT Outsourcing`}</title>
				<meta
					name="description"
					content={`${pageNameCMS?.title} | HumanX | BPO and IT Outsourcing `}
				/>
				<link rel="canonical" href="/privacy-policy" />
			</Helmet>
			<section className="fixSection">
				<div className="terms ">
					<div className="terms__Title">
						{/* <div className="titleSub">Terms & Conditions</div> */}
						<div className="titleMain">{policyCMS?.[0]?.title}</div>
						<div className="titleDesc terms__Desc">
							{htmlParser(policyCMS?.[0]?.description)}
						</div>
					</div>
				</div>
			</section>
			<Booking contactCMS={contactCMS} />
		</>
	);
};

export default PrivacyPolicy;
