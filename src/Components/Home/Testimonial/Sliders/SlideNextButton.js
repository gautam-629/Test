import { React } from 'react';
import { useSwiper } from 'swiper/react';
import RightArrow from '../../../../Assets/Slider/arrowright.png';
import '../Sliders/Slider.css';
import { IoIosArrowUp } from 'react-icons/io';

export default function SlideNextButton() {
	const swiper = useSwiper();

	return (
		<button
			className="next-button btn-Rotate"
			onClick={() => swiper.slideNext()}
		>
			<IoIosArrowUp className="arrow" />
		</button>
	);
}
