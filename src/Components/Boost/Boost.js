import React from 'react';
import { useLocation } from 'react-router-dom';

import './Boost.css';

import { removeHtml } from '../../utils/removeHtml';
import { getFileUrl } from '../../utils/imageURL';

const Boost = ({ servicesCMS, values, service }) => {
	const location = useLocation();

	// Check if the current route is "/career" to determine the background color
	const isCareerRoute = location.pathname === '/career';

	// Define a CSS class for the background color based on the route
	const backgroundClass = isCareerRoute ? 'boost-career' : 'boost';

	// const limitedValues = values ? values.slice(0, 3) : [];
	const limitedValues = values || [];

	console.log('service check:', service);

	return (
		<>
			{values && values.length > 0 ? (
				<div className={`${backgroundClass}`}>
					<div className="boost__header">
						<div className="titleSub">{service?.whySubHeading}</div>
						<div className="titleMain">
							{/* {removeHtml(servicesCMS?.[6]?.description)} */}
							{service?.whyHeading}
						</div>
					</div>
					<div className="boost__content">
						{limitedValues.map((value) => (
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
			) : (
				''
			)}
		</>
	);
};

export default Boost;
