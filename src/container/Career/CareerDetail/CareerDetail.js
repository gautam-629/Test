import React, { useState, useRef } from 'react';
import { useQuery, useMutation } from 'react-query';
import { useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

import customHtmlParser from '../../../utils/customHtmlParser';
import { Booking, LoadingSpinner } from '../../../Components';

import './CareerDetail.css';

// services
import { getCMS } from '../../../services/home/home.services';
import {
	getCareer,
	submitCareerForm,
} from '../../../services/career/career.services';

const DEFAULT_PAGE_SIZE = 4;
const contact_slug = 'contact-page';

const CareerDetail = () => {
	const fileInputRef = useRef(null);

	const { slug } = useParams();

	const initialValues = {
		email: '',
		name: '',
		location: '',
		position: '',
		coverLetter: '',
		file: '',
	};

	const [data, setData] = useState(initialValues);
	const [selectedFile, setSelectedFile] = useState(null);

	// useMutation
	const { mutate, isLoading, isError } = useMutation(submitCareerForm, {
		onSuccess: (data) => {
			toast.success(data);

			// Clear the form after successful submission
			setData({
				email: '',
				name: '',
				location: '',
				position: '',
				coverLetter: '',
				file: '',
			});
			if (fileInputRef.current) {
				fileInputRef.current.value = '';
			}
		},
		onError: (err) => {
			toast.error(err);
		},
	});

	//Queries

	const { data: career, isLoading: careerLoading } = useQuery(
		['career', slug],
		() => getCareer(slug, 1),
		{
			enabled: !!slug,
		}
	);
	const { data: contactCMS, isLoading: contactCMSLoading } = useQuery(
		['contact-cms', contact_slug],
		() => getCMS(contact_slug, DEFAULT_PAGE_SIZE)
	);

	if (careerLoading || contactCMSLoading) {
		return <LoadingSpinner />;
	}

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		setData({
			...data,
			[name]: value,
		});
	};

	const handleFileChange = (e) => {
		setSelectedFile(e.target.files[0]);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Handle form submission, including file upload
		const formData = new FormData();

		formData.append('email', data.email);
		formData.append('name', data.name);
		formData.append('location', data.location);
		formData.append('position', career?.title);
		formData.append('coverLetter', data.coverLetter);
		formData.append('file', selectedFile);
		// Send formData to your server or perform further actions

		// Call the mutation function to submit the form data
		mutate(formData);
	};

	return (
		<>
			<Helmet>
				<title>{`${career?.title} | HumanX | BPO and IT Outsourcing `}</title>
				<meta
					name="description"
					content={`${career?.title} | HumanX | BPO and IT Outsourcing `}
				/>
				<link rel="canonical" href={`/career-detail/${slug}`} />
			</Helmet>
			{/* Job Details Section */}
			<section className="fixSection">
				<div className="job">
					<div className="job__left">
						<div className="job__Title">{career?.title}</div>
						<div className="job__content">
							<div className="job__List">
								{customHtmlParser(career?.description)}
							</div>
						</div>
					</div>
					<div className="job__right">
						<div className="job__Title">Apply Here</div>

						<form className="job__Form" onSubmit={handleSubmit}>
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
								placeholder="Full Name*"
								type="text"
								value={data.name}
								onChange={handleInputChange}
								required
							/>
							<input
								name="position"
								className="form-control-primary"
								type="text"
								value={career?.title} // Sending data
								disabled
							/>
							{/* <input
					
								type="file"
								name="file"
								className="form-control-primary"
								placeholder="Upload CV*"
								id="fileInput"
								accept=".pdf" // Define allowed file types
								onChange={handleFileChange}
								required
								ref={fileInputRef}
							/> */}

                           <input  type="file" />

							<textarea
								name="coverLetter"
								className="form-control-primary job-text-area"
								placeholder="Upload CV*"
								type="text"
								accept=".pdf" // Define allowed file types
								value={data.coverLetter}
								onChange={handleInputChange}
								required
								ref={fileInputRef}
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
									An error occurred while submitting the form.
								</div>
							)}
						</form>
					</div>
				</div>
			</section>

			{/* Booking Section */}
			<Booking contactCMS={contactCMS} />
		</>
	);
};

export default CareerDetail;
