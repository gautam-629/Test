import React from 'react';
import { useNavigate } from 'react-router-dom';
import htmlParser from '../../utils/htmlParser'; // Import the htmlParser function

import './About.css';
import Row from './Row/Row';
import GroupWrapper from './GroupWrapper/GroupWrapper';

import { getFileUrl } from '../../utils/imageURL';

const About = ({ homeCMS }) => {
	const navigate = useNavigate();

	const navigateToAbout = () => {
		// navigate to /about
		window.scrollTo(0, 0);
		navigate('/about');
	};

	return (
		<div id="about-us" className="about-wrapper">
			<div className="group-wrapper">
				<GroupWrapper />
			</div>
			<div className="at-wrapper">
				<div className="at-l-wrapper">
					<img
						src={getFileUrl(homeCMS?.[9]?.image)}
						className="background__Image"
						alt="about image"
					/>
					<div className="about__Content">
						<div className="at-box">
							<div className="heading__Div">
								<div className="heading-text">{homeCMS?.[9]?.title}</div>
							</div>
						</div>
					</div>
				</div>
				<div className="at-r-wrapper">
					<div className="titleAbout">
						<div className="titleSub">About us</div>
						<div className="at-title">{homeCMS?.[10]?.title}</div>
						<div className="second-title">
							{/* Use htmlParser to parse the HTML content */}
							{htmlParser(homeCMS?.[10]?.description)}
						</div>
					</div>
					<div className="r-content">
						<Row homeCMS={homeCMS} />
						<div className="row">
							<div className="r-img-wrapper">
								<img src={getFileUrl(homeCMS?.[28]?.image)} />
							</div>
							<div className="r-inner-content">
								<div className="heading r-heading">{homeCMS?.[28]?.title}</div>
								<div className="inner-title">
									{/* Use htmlParser to parse the HTML content */}
									{htmlParser(homeCMS?.[28]?.description)}
								</div>
							</div>
						</div>
					</div>
					<div className="btn-wrapper">
						<button
							className="button button-primary button-hover-primary"
							onClick={navigateToAbout}
						>
							Know More
						</button>
					</div>
				</div>
			</div>
			<div className="group-wrapper flex-end">
				<GroupWrapper />
			</div>
		</div>
	);
};

export default About;
