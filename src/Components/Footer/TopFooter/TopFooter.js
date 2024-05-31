import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import { useRouter } from 'next/navigation';

import { toast } from 'react-toastify';

import './TopFooter.css';

import { HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';

import { LoadingSpinner } from '../../../Components';

//services
import { getServices, getCMS } from '../../../services/home/home.services';
import { getSiteSettings } from '../../../services/site-settings/site-settings.services';
import { submitContactForm } from '../../../services/contact/contact.services';

import { getFileUrl } from '../../../utils/imageURL';
import { removeHtml } from '../../../utils/removeHtml';

const DEFAULT_PAGE_SIZE = 4;
const slug = 'contact-page';

const TopFooter = () => {
	const navigate = useRouter();

	const [formData, setFormData] = useState({
		email: '',
		name: '',
		subject: '',
		message: '',
		contact: '',
	});

	const { mutate, isLoading, isError } = useMutation(submitContactForm, {
		onSuccess: (data) => {
			toast.success(data);

			// Clear the form after successsful submission
			setFormData({
				email: '',
				name: '',
				subject: '',
				message: '',
				contact: '',
			});
		},
		onError: (err) => {
			toast.error(err);
		},
	});

	//Queries
	const { data: services, isLoading: servicesLoading } = useQuery(
		'services',
		() => getServices(0, DEFAULT_PAGE_SIZE)
	);

	const { data: siteSettings, isLoading: siteSettingsLoading } = useQuery(
		'site-settings',
		() => getSiteSettings()
	);
	const { data: footerCMS, isLoading: footerCMSLoading } = useQuery(
		['footer-cms', slug],
		() => getCMS(slug, DEFAULT_PAGE_SIZE)
	);

	if (servicesLoading || siteSettingsLoading || footerCMSLoading) {
		return <LoadingSpinner />;
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		// Call the mutation function to submit the form data
		mutate(formData);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	// navigate to Services Page
	const navigateToServices = (slug) => {
		setTimeout(() => {
			window.scrollTo(0, 0);
			navigate.push(`/${slug}`);
		}, 100);
	};

	return (
		<section className="topFooterSection">
			<section className="fixSection">
				<div className="top-footer ">
					<div className="ft-left-wrapper">
						<div className="footer-logo">
							<Link to="/" onClick={() => window.scrollTo(0, 0)}>
								<img src={getFileUrl(siteSettings?.footerLogo)} />
							</Link>
						</div>
						<div className="main-container">
							<div className="main-desc">
								{removeHtml(footerCMS?.[2]?.description)}
							</div>
						</div>
						<div className="bottom-container">
							<div className="ft-row">
								<div className="ft-icon-wrapper">
									<HiOutlineMail className="small__icons" />
								</div>
								<div className="ft-content">
									<span className="ft-heading">Email</span>
									<span className="ft-subtitle">{siteSettings?.email}</span>
								</div>
							</div>
							<div className="ft-row">
								<div className="ft-icon-wrapper">
									<FaWhatsapp className="small__icons" />
								</div>
								<div className="ft-content">
									<span className="ft-heading">WhatsApp</span>
									<span className="ft-subtitle">
										{siteSettings?.phone}, {siteSettings?.phone2}{' '}
									</span>
								</div>
							</div>
							<div className="ft-row">
								<div className="ft-icon-wrapper">
									<HiOutlineLocationMarker className="small__icons" />
								</div>
								<div className="ft-content">
									<span className="ft-heading">Australia</span>
									<span className="ft-subtitle">{siteSettings?.address}</span>
								</div>
							</div>
							<div className="ft-row">
								<div className="ft-icon-wrapper">
									<HiOutlineLocationMarker className="small__icons" />
								</div>
								<div className="ft-content">
									<span className="ft-heading">Nepal</span>
									<span className="ft-subtitle">{siteSettings?.address2}</span>
								</div>
							</div>
						</div>
					</div>
					<div className="ft-center-wrapper">
						<div className="footer-links">
							<div className="footer-heading">Services</div>
							<ul>
								{services?.map((service) => (
									<li
										className="services__ListItem"
										key={service?.slug}
										onClick={() => navigateToServices(service?.slug)}
									>
										{service?.title}
									</li>
								))}
							</ul>
						</div>
					</div>
					<div className="ft-right-wrapper">
						<div className="main-title">Get In Touch</div>
						<div className="form-wrapper">
							<form action="" onSubmit={handleSubmit}>
								<input
									name="email"
									className="form-control"
									placeholder="Email Address"
									type="email"
									value={formData.email}
									onChange={handleInputChange}
									required
								/>
								<input
									name="name"
									className="form-control"
									placeholder="Company Name"
									type="text"
									value={formData.name}
									onChange={handleInputChange}
								/>
								<input
									name="contact"
									className="form-control"
									placeholder="Contact Number"
									type="contact"
									value={formData.contact}
									onChange={handleInputChange}
									required
								/>
								<textarea
									name="message"
									className="form-control txt-area"
									placeholder="Your Inquiry*"
									required
									value={formData.message}
									onChange={handleInputChange}
								></textarea>

								<div className="btn-Submit">
									<button
										className="button button-primary button-hover-primary"
										type="submit"
										disabled={isLoading}
									>
										{isLoading ? 'Submitting ...' : 'Submit'}
									</button>
									{isError && (
										<div className="error-message">
											An error occured while submitting the form.
										</div>
									)}
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		</section>
	);
};

export default TopFooter;
