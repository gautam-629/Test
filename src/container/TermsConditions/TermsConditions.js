import React from 'react';
import { useQuery } from 'react-query';

import { Booking, LoadingSpinner } from '../../Components';

import './TermsConditions.css';
import htmlParser from '../../utils/htmlParser';

import { Helmet } from 'react-helmet-async';

// services
import { getCMS, getCMSPageName } from '../../services/home/home.services';
import { removeHtml } from '../../utils/removeHtml';

const slug = 'terms-conditions-page';
const contact_slug = 'contact-page';
const DEFAULT_PAGE_SIZE = 4;

const TermsConditions = () => {
	// Queries
	const { data: termsCMS, isLoading: termsCMSLoading } = useQuery(
		['terms-conditions', slug],
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

	if (termsCMSLoading || contactCMSLoading || pageNameCMSLoading) {
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
				<link rel="canonical" href="/terms-conditions" />
			</Helmet>
			<section className="fixSection">
				<div className="terms ">
					<div className="terms__Title">
						{/* <div className="titleSub">Terms & Conditions</div> */}
						<div className="titleMain">{termsCMS?.[0]?.title}</div>
						<div className="titleDesc terms__Desc">
							{htmlParser(termsCMS?.[0]?.description)}
						</div>
					</div>
				</div>
			</section>
			<Booking contactCMS={contactCMS} />
		</>
	);
};

export default TermsConditions;
