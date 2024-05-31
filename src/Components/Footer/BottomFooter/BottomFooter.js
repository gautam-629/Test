import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import './BottomFooter.css';

import LoadingSpinner from '../../Spinner/LoadingSpinner';

// services
import { getSiteSettings } from '../../../services/site-settings/site-settings.services';

const BottomFooter = () => {
	// Queries
	const { data: siteSettings, isLoading: siteSettingsLoading } = useQuery(
		'site-settings',
		() => getSiteSettings()
	);

	if (siteSettingsLoading) {
		return <LoadingSpinner />;
	}

	return (
		<div className="bottom-footer">
			<div className="fixSection">
				<div className="footer-innerlink">
					<ul>
						<li>
							<Link
								to="/about"
								className="footer__linkItem"
								onClick={() => window.scrollTo(0, 0)}
							>
								About
							</Link>
						</li>
						<li>
							<Link
								to="/blogs"
								className="footer__linkItem"
								onClick={() => window.scrollTo(0, 0)}
							>
								Blog
							</Link>
						</li>
						<li>
							<Link
								to="/career"
								className="footer__linkItem"
								onClick={() => window.scrollTo(0, 0)}
							>
								Careers
							</Link>
						</li>
						<li>
							<Link
								to="/privacy-policy"
								className="footer__linkItem"
								onClick={() => window.scrollTo(0, 0)}
							>
								Privacy Policy
							</Link>
						</li>
						<li>
							<Link
								to="/terms-conditions"
								className="footer__linkItem"
								onClick={() => window.scrollTo(0, 0)}
							>
								Terms & Conditions
							</Link>
						</li>
					</ul>
				</div>
				<div className="icons">
					<div className="icon-wrapper">
						<a href={siteSettings?.facebook} className="footer__linkItem">
							<i className="fa-brands fa-facebook fa-xl"></i>
						</a>
					</div>
					<div className="icon-wrapper">
						<a href={siteSettings?.twitter} className="footer__linkItem">
							<i className="fa-brands fa-instagram fa-xl"></i>
						</a>
					</div>
					<div className="icon-wrapper">
						<a href={siteSettings?.linkedIn} className="footer__linkItem">
							<i className="fab fa-linkedin fa-xl"></i>
						</a>
					</div>
					<div className="icon-wrapper">
						<a
							href="https://medium.com/@connecthumanx"
							className="footer__linkItem"
						>
							<i className="fab fa-medium fa-xl"></i>
						</a>
					</div>

					<div className="icon-wrapper">
						<a
							href="https://api.whatsapp.com/send?phone=9779802352059"
							className="footer__linkItem"
						>
							<i className="fab fa-whatsapp fa-xl"></i>
						</a>
					</div>
					<div className="icon-wrapper">
						<a
							href="https://twitter.com/Humanxglobal"
							className="footer__linkItem"
						>
							<i className="fa-brands fa-square-x-twitter fa-xl"></i>
						</a>
					</div>
				</div>

				<div className="copyright">
					&copy; 2023 HumanXGlobal. All rights reserved
				</div>
			</div>
		</div>
	);
};

export default BottomFooter;
