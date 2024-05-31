import React, { useState, useRef, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import {
	FacebookShareButton,
	TwitterShareButton,
	LinkedinShareButton,
	WhatsappShareButton,
	EmailShareButton,
} from 'react-share';
import {
	FacebookIcon,
	TwitterIcon,
	LinkedinIcon,
	WhatsappIcon,
	EmailIcon,
} from 'react-share';

import './CommentForm.css';
import Image from '../../../Assets/Testimonials/person-3.jpg';

import { FaTelegramPlane } from 'react-icons/fa';

import Emoji1 from '../../../Assets/upvote-emoji.png';
import Emoji2 from '../../../Assets/love-emoji.png';
import Emoji3 from '../../../Assets/funny-emoji.png';
import Emoji4 from '../../../Assets/angry-emoji.png';
import Emoji5 from '../../../Assets/surprise-emoji.png';
import Emoji6 from '../../../Assets/sad-emoji.png';

// services
import { submitBlogReview } from '../../../services/blog/blog.services';

const CommentForm = ({ blogReviews, blogId, blog }) => {
	const [selectedResponse, setSelectedResponse] = useState(null);
	const parsedBlogId = parseInt(blogId);
	const responseRef = useRef(null);

	const initialValues = {
		email: '',
		name: '',
		comment: '',
		response: '',
		blogId: '',
		status: 'rejected',
	};

	const RESPONSE_ENUM = {
		UPVOTE: {
			label: 'upvote',
			icon: Emoji1,
		},
		LOVE: {
			label: 'love',
			icon: Emoji2,
		},
		FUNNY: {
			label: 'funny',
			icon: Emoji3,
		},
		ANGRY: {
			label: 'angry',
			icon: Emoji4,
		},
		SURPRISED: {
			label: 'surprised',
			icon: Emoji5,
		},
		SAD: {
			label: 'sad',
			icon: Emoji6,
		},
	};

	const [data, setData] = useState(initialValues);

	const queryClient = useQueryClient();

	// useMutation
	const { mutate, isLoading, isError } = useMutation(submitBlogReview, {
		onSuccess: (data) => {
			toast.success('Blog Review has been submitted successfully');
			console.log('data', data);

			// Clear the form after successful submission
			setData(initialValues);
			// Invalidate the query to trigger refetch of blog reviews
			queryClient.invalidateQueries('all-blog-reviews');

			// Reset selected response
			setSelectedResponse(null);
		},
		onError: (err) => {
			toast.error(err);
			console.log('error', err);
		},
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		setData({
			...data,
			[name]: value,
		});
	};

	const handleResponseSelect = (response) => {
		console.log('Selected Response:', response.label);

		setSelectedResponse(response.label); // Set the selected response
		setData({
			...data,
			response: response.label,
		});
	};

	const handleClickOutside = (event) => {
		if (responseRef.current && !responseRef.current.contains(event.target)) {
			setSelectedResponse(null);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const requestData = {
			email: data.email,
			name: data.name,
			comment: data.comment,
			response: data.response,
			blogId: parsedBlogId,
			status: 'rejected',
		};

		mutate(requestData);
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const blogReviewsCount = blogReviews.length;

	return (
		<div className="comment-form-wrapper">
			<div className="comment-title">
				{/* Share buttons */}
				<div className="share-buttons-section">
					<h2 className="text-bolder">Leave a Reply</h2>
					<div className="share-buttons">
						<FacebookShareButton url={window.location.href} quote={blog?.title}>
							<FacebookIcon size={32} round />
						</FacebookShareButton>
						<TwitterShareButton title={blog?.title} url={window.location.href}>
							<TwitterIcon size={32} round />
						</TwitterShareButton>
						<WhatsappShareButton url={window.location.href} title={blog?.title}>
							<WhatsappIcon size={32} round />
						</WhatsappShareButton>
						<EmailShareButton url={window.location.href} title={blog?.title}>
							<EmailIcon size={32} round />
						</EmailShareButton>
					</div>
				</div>
			</div>
			<form className="comment-form" onSubmit={handleSubmit}>
				<textarea
					name="comment"
					className="form-control-dark txt-area"
					type="text"
					value={data.comment}
					onChange={handleInputChange}
					placeholder="Comment"
					required
				></textarea>

				<input
					name="name"
					className="form-control-dark"
					type="text"
					value={data.name}
					onChange={handleInputChange}
					placeholder="Name"
					required
				/>

				<input
					name="email"
					className="form-control-dark"
					type="email"
					placeholder="Email"
					value={data.email}
					onChange={handleInputChange}
					required
				/>

				{/* Hidden input field for labeling the form submission */}
				<input
					type="hidden"
					name="blogId"
					value={String(parsedBlogId)}
					disabled
				/>

				{/* Blog Review Responses */}
				<div className="response-div" ref={responseRef}>
					{Object.keys(RESPONSE_ENUM).map((key) => (
						<div
							key={key}
							className={`response-row ${
								selectedResponse === RESPONSE_ENUM[key].label ? 'active' : ''
							}`}
							onClick={() => handleResponseSelect(RESPONSE_ENUM[key])}
						>
							<div>
								<img
									src={RESPONSE_ENUM[key].icon}
									className="response-icon"
									alt="response icon"
								/>
							</div>
							<p className="text-uppercase text-response">
								{RESPONSE_ENUM[key].label}
							</p>
						</div>
					))}
				</div>

				<div>
					<button
						type="submit"
						className="button button-primary button-hover-primary"
						disabled={isLoading}
					>
						{isLoading ? 'Submitting...' : <>Post Comment</>}
					</button>
					{isError && (
						<div className="error-message">
							please react before submitting comment...
						</div>
					)}
				</div>
			</form>
		</div>
	);
};

export default CommentForm;
