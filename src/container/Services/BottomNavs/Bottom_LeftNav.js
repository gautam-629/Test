import React from 'react';
import { useSwiper } from 'swiper/react';
import { SlArrowLeft } from 'react-icons/sl';

export default function Bottom_LeftNav() {
	const swiper = useSwiper();

	return (
		<button
			className="prev-button color-primary"
			onClick={() => swiper.slidePrev()}
		>
			<SlArrowLeft />
		</button>
	);
}
