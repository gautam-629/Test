import { React } from 'react';
import { useSwiper } from 'swiper/react';
import LeftArrow from '../../../../Assets/Slider/arrowleft.png';
import './Slider.css';
import { IoIosArrowDown } from 'react-icons/io';

export default function SlidePrevButton() {
	const swiper = useSwiper();

	return (
		<button
			className="prev-button btn-Rotate"
			onClick={() => swiper.slidePrev()}
		>
			<IoIosArrowDown className="arrow" />
		</button>
	);
}
