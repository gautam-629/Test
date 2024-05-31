import React from 'react';
import './LoadingSpinner.css';
import { TailSpin } from 'react-loader-spinner';

const LoadingSpinner = () => {
	return (
		<div className="Loader">
			<TailSpin
				height="80"
				width="80"
				ariaLabel="tail-spin-loading"
				radius="1"
				visible={true}
				color="#f7941d"
			/>
		</div>
	);
};

export default LoadingSpinner;
