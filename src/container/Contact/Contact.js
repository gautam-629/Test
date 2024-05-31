import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { useLocation } from 'react-router-dom';

import { toast } from 'react-toastify';

import { Helmet } from 'react-helmet-async';

import './Contact.css';

import { Booking, LoadingSpinner } from '../../Components';

import { HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi';
import { PiPhoneCallFill } from 'react-icons/pi';

// services
import { submitContactForm } from '../../services/contact/contact.services';
import { getCMS, getCMSPageName } from '../../services/home/home.services';
import { getSiteSettings } from '../../services/site-settings/site-settings.services';
import { removeHtml } from '../../utils/removeHtml';
import { getService } from '../../services/services/services.services';

const DEFAULT_PAGE_SIZE = 4;

const Contact = () => {
	const location = useLocation();

	const queryParams = new URLSearchParams(location.search);
	const slug = queryParams.get('slug');

	const initialUserData = {
		email: '',
		name: '',
		subject: '',
		message: '',
	};

	const [data, setData] = useState(initialUserData);

	const { mutate, isLoading, isError } = useMutation(submitContactForm, {
		onSuccess: (data) => {
			toast.success(data);
			//Clear the form after successful submission
			clearForm();

			setData({
				email: '',
				name: '',
				subject: '',
				message: '',
			});
		},
		onError: (err) => {
			toast.error(err);
		},
	});

	const clearForm = () => {
		setData(initialUserData);
	};

	const home_slug = 'home-page';
	const contact_slug = 'contact-page';
	const contact_map_slug = 'contact-map';

	// Queries
	const { data: homeCMS, isLoading: homeCMSLoading } = useQuery(
		['home-cms', home_slug],
		() => getCMS(home_slug, DEFAULT_PAGE_SIZE)
	);
	const { data: siteSettings, isLoading: siteSettingsLoading } = useQuery(
		'site-settings',
		() => getSiteSettings()
	);
	const { data: contactCMS, isLoading: contactCMSLoading } = useQuery(
		['contact-cms', contact_slug],
		() => getCMS(contact_slug, DEFAULT_PAGE_SIZE)
	);

	const { data: service, isLoading: serviceLoading } = useQuery(
		['service', slug],
		() => getService(slug, 1),
		{ enabled: !!slug }
	);
	const { data: contactMap, isLoading: contactMapLoading } = useQuery(
		['contact-map', contact_map_slug],
		() => getCMS(contact_map_slug, 1)
	);
	const { data: pageNameCMS, isLoading: pageNameCMSLoading } = useQuery(
		['cms-pageName', contact_slug],
		() => getCMSPageName(contact_slug, DEFAULT_PAGE_SIZE)
	);

	if (
		homeCMSLoading ||
		siteSettingsLoading ||
		contactCMSLoading ||
		serviceLoading ||
		contactMapLoading ||
		pageNameCMSLoading
	) {
		return <LoadingSpinner />;
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		// Call the mutation function to submit the form data
		const formData = new FormData();

		formData.append('email', data.email);
		formData.append('name', data.name);
		formData.append('subject', service?.title);
		formData.append('message', data.message);

		mutate(formData);

		// clear the form fields
		clearForm();
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setData({
			...data,
			[name]: value,
		});
	};

	return (
		<>
			<Helmet>
				<title>{`${pageNameCMS?.title} | HumanX | BPO and IT Outsourcing`}</title>
			</Helmet>
			{/* Contact Section */}
			<section className="fixSection">
				<div className="contact">
					<div className="contact__left">
						<div className="titleSub">Get In Touch</div>
						<div className="titleMain">{contactCMS?.[1]?.title}</div>
						<div className="titleDesc contact__titleDesc">
							{removeHtml(contactCMS?.[1]?.description)}
						</div>
						<div className="contact__Content">
							<div className="contact__Row">
								<div className="contact-icon-wrapper">
									<HiOutlineLocationMarker className="contact__icons" />
								</div>
								<div className="contact__Text">
									<span className="contact__Heading">Location</span>
									<span className="contact__subHeading">
										{siteSettings?.address}
									</span>
								</div>
							</div>
							<div className="contact__Row">
								<div className="contact-icon-wrapper">
									<PiPhoneCallFill className="contact__icons" />
								</div>
								<div className="contact__Text">
									<span className="contact__Heading">Phone</span>
									<span className="contact__subHeading">
										(+61) {siteSettings?.phone}
									</span>
									<span className="contact__subHeading">
										Mobile: {siteSettings?.phone}
									</span>
								</div>
							</div>
							<div className="contact__Row">
								<div className="contact-icon-wrapper">
									<HiOutlineMail className="contact__icons" />
								</div>
								<div className="contact__Text">
									<span className="contact__Heading">Email</span>
									<span className="contact__subHeading">
										{siteSettings?.email}
									</span>
									<span className="contact__subHeading">
										{siteSettings?.email2}
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className="contact__right">
						<form className="contact__Form" onSubmit={handleSubmit}>
							<input
								name="email"
								className="form-control-primary"
								placeholder="Email Address*"
								type="email"
								value={data.email}
								onChange={handleInputChange}
								required
							/>
							<input
								name="name"
								className="form-control-primary"
								placeholder="Company Name"
								type="text"
								value={data.name}
								onChange={handleInputChange}
								required
							/>
							<input
								name="subject"
								className="form-control-primary"
								placeholder="Project Type"
								type="text"
								value={service?.title}
								disabled
							/>
							<textarea
								name="message"
								className="form-control-primary contact-text-area"
								placeholder="Your message*"
								type="text"
								value={data.message}
								onChange={handleInputChange}
								required
							></textarea>
							<button
								className="button button-primary margin-top button-hover-primary"
								type="submit"
								disabled={isLoading}
							>
								{isLoading ? 'Submitting...' : 'Submit'}
							</button>
							{isError && (
								<div className="error-message">
									An error occured while submitting the form.
								</div>
							)}
						</form>
					</div>
				</div>
			</section>
			<section>
				<div className="map__wrapper">
					<iframe
						src={contactMap[0].title}
						width="1500"
						height="450"
						allowFullScreen=""
						style={{ border: 0 }}
						className="map__Image"
						loading="lazy"
						aria-hidden="false"
						tabIndex="0"
						// referrerpolicy="no-referrer-when-downgrade"
					></iframe>
				</div>
			</section>

			{/* Booking Section */}
			<Booking homeCMS={homeCMS} />
		</>
	);
};

export default Contact;
