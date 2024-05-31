import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';

import './Gallery.css';

import RectangularDot from '../../Assets/About/Group-1.png';
import Group1 from '../../Assets/About/Group1';

// services
import { getGallery } from '../../services/about/about.services';

import { getFileUrl } from '../../utils/imageURL';
import { removeHtml } from '../../utils/removeHtml';
import LoadingSpinner from '../Spinner/LoadingSpinner';

import htmlParser from '../../utils/htmlParser';

const DEFAULT_PAGE_SIZE = 10;
const slug = 'humanx';

const Gallery = ({ aboutCMS }) => {
	const navigate = useNavigate();
	const location = useLocation();

	// Queries
	const { data: gallery, isLoading: galleryLoading } = useQuery(
		['gallery', slug],
		() => getGallery(slug, 0, DEFAULT_PAGE_SIZE)
	);

	if (galleryLoading) {
		return <LoadingSpinner />;
	}

	// navigate to /career
	const navigateToCareer = () => {
		window.scrollTo(0, 0);
		navigate('/career');
	};

	// Check if the current route is "/career" to determine whether to show the button
	const isCareerRoute = location.pathname === '/career';

	return (
		<section className="gallery">
			<div className="gallery__dotGroup galleryDot-Top">
				{/* <img src={RectangularDot} alt="rect dots" className="rect__dots" />
				<img src={RectangularDot} alt="rect dots" className="rect__dots" />
				<img src={RectangularDot} alt="rect dots" className="rect__dots" /> */}
				<Group1 />
				<Group1 />
				<Group1 />
			</div>
			<div className="gallery__header">
				<div className="gallery__header-left">
					<div className="titleSub">{aboutCMS?.[14]?.title}</div>
					<div className="titleMain">
						{htmlParser(aboutCMS?.[14]?.description)}
					</div>
				</div>
				<div className="gallery__header-right">
					{!isCareerRoute && (
						<button
							className="button button-primary button-hover-primary"
							onClick={navigateToCareer}
						>
							Join Team
						</button>
					)}
				</div>
			</div>
			<div className="gallery__content">
				<div className="gallery__content-left">
					<img
						src={getFileUrl(gallery?._images[0])}
						className="gallery__image img-first"
						alt="image"
					/>
					<img
						src={getFileUrl(gallery?._images[1])}
						className="gallery__image"
						alt="image"
					/>
				</div>

				<div className="gallery__content-center">
					<div className="gallery__topDiv">
						<img
							src={getFileUrl(gallery?._images[2])}
							className="gallery__image"
							alt="image"
						/>
					</div>
					<div className="gallery__innerDiv">
						<img
							src={getFileUrl(gallery?._images[3])}
							className="gallery__image gallery__Left-img"
							alt="image"
						/>
						<img
							src={getFileUrl(gallery?._images[4])}
							className="gallery__image gallery__Right-img"
							alt="image"
						/>
					</div>
				</div>
				<div className="gallery__content-right">
					<img
						src={getFileUrl(gallery?._images[5])}
						className="gallery__image"
						alt="image"
					/>
					<img
						src={getFileUrl(gallery?._images[6])}
						className="gallery__image"
						alt="image"
					/>
				</div>
				<div className="gallery__content-left">
					<img
						src={getFileUrl(gallery?._images[7])}
						className="gallery__image img-first"
						alt="image"
					/>
					<img
						src={getFileUrl(gallery?._images[8])}
						className="gallery__image"
						alt="image"
					/>
				</div>

				<div className="gallery__content-center">
					<div className="gallery__innerDiv">
						<img
							src={getFileUrl(gallery?._images[9])}
							className="gallery__image gallery__Right-img"
							alt="image"
						/>
						<img
							src={getFileUrl(gallery?._images[10])}
							className="gallery__image gallery__Left-img"
							alt="image"
						/>
					</div>
					<div className="gallery__topDiv">
						<img
							src={getFileUrl(gallery?._images[11])}
							className="gallery__image"
							alt="image"
						/>
					</div>
				</div>
				<div className="gallery__content-right">
					<img
						src={getFileUrl(gallery?._images[12])}
						className="gallery__image"
						alt="image"
					/>
					<img
						src={getFileUrl(gallery?._images[13])}
						className="gallery__image"
						alt="image"
					/>
				</div>
			</div>
			<div className="gallery__dotGroup galleryDot-Bottom">
				{/* <img src={RectangularDot} alt="rect dots" className="react-dots" />
				<img src={RectangularDot} alt="rect dots" className="rect__dots" />
				<img src={RectangularDot} alt="rect dots" className="rect__dots" /> */}
				<Group1 />
				<Group1 />
				<Group1 />
			</div>
		</section>
	);
};

export default Gallery;
