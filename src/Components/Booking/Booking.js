import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import './Booking.css';
import { getFileUrl } from '../../utils/imageURL';

const Booking = ({ contactCMS }) => {
	const navigate = useNavigate();
	const location = useLocation();

	// Check if the current route is not '/contact-us'
	const isNotContactUsRoute = location.pathname !== '/contact-us';

	// navigate to /contact-us
	const navigateToContact = () => {
		window.scrollTo(0, 0);
		navigate('/contact-us');
	};

	return isNotContactUsRoute ? (
		<section
			style={{
				backgroundImage: `url(${getFileUrl(contactCMS?.[0]?.image)})`,
				backgroundAttachment: 'fixed',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
			}}
		>
			<section className="fixSection">
				<div className="booking-wrapper ">
					<div className="booking">
						<div className="booking__Content fixSection">
							<div className="booking__title">{contactCMS?.[0]?.title}</div>
							<div>
								{/* Conditionally render the text on button */}
								<button
									className="button button-white button-hover-gray"
									onClick={navigateToContact}
								>
									Contact Us
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</section>
	) : null;
};

export default Booking;
