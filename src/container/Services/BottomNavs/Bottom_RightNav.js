import React from 'react';
import { useSwiper } from 'swiper/react';
import { SlArrowRight } from 'react-icons/sl';

export default function Bottom_RightNav() {
	const swiper = useSwiper();

	return (
		<button
			className="prev-button"
			style={{ backgroundColor: '#F7941D', color: '#fff' }}
			onClick={() => swiper.slideNext()}
		>
			<SlArrowRight />
		</button>
	);
}
