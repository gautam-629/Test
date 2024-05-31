import React from 'react';
import './ImagePopup.css';

const ImagePopup = ({ imageUrl, onClose }) => {
	return (
		<div className="image-popup">
			<div className="image-popup-content">
				<span className="close-button" onClick={onClose}>
					&times;
				</span>
				<img className="popup-image" src={imageUrl} alt="Popup" />
			</div>
		</div>
	);
};

export default ImagePopup;
