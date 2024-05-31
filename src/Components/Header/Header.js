import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';

import './Header.css';

import { LoadingSpinner } from '../../Components';

import { BsChevronDown } from 'react-icons/bs';
import { PiPhoneCallFill } from 'react-icons/pi';
import { GiHamburgerMenu } from 'react-icons/gi';

// services
import { getSiteSettings } from '../../services/site-settings/site-settings.services';
import { getFileUrl } from '../../utils/imageURL';
import { getServiceCategory } from '../../services/services/services.services';
import { removeHtml } from '../../utils/removeHtml';

const Header = ({ currentRoute }) => {
	const navigate = useNavigate();

	const [headerTextColor, setHeaderTextColor] = useState('black');
	const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track menu visibility

	//Initialize isOpen state for each dropdown item to false
	const [dropdownStates, setDropdownStates] = useState([]);

	const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

	// const toggleMenu = (index) => {
	// 	// setIsMenuOpen(!isMenuOpen); // Toggle the menu state when the button is clicked.

	// 	const newDropdownStates = [...dropdownStates];
	// 	newDropdownStates[index] = !newDropdownStates[index];
	// 	setDropdownStates(newDropdownStates);

	// 	if (openDropdownIndex === index) {
	// 		// Clicked on the already open dropdown, close it
	// 		setOpenDropdownIndex(null);
	// 	} else {
	// 		// Clicked on a different dropdown, open it and close others
	// 		setOpenDropdownIndex(index);
	// 	}
	// };

	const toggleMenu = (index) => {
		if (openDropdownIndex === index) {
			// Clicked on the already open dropdown, close it
			setOpenDropdownIndex(null);
		} else {
			// Clicked on a different dropdown, open it and close others
			setOpenDropdownIndex(index);
		}
	};

	//Set dynamic text color based on the current route
	useEffect(() => {
		setHeaderTextColor(currentRoute === '/' ? 'white' : 'black');
	}, [currentRoute]);

	// Disable scrolling when the menu is open
	useEffect(() => {
		if (isMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	}, [isMenuOpen]);

	// Queries
	const { data: siteSettings, isLoading: siteSettingsLoading } = useQuery(
		'site-settings',
		() => getSiteSettings()
	);
	const { data: serviceCategories, isLoading: serviceCategoriesLoading } =
		useQuery('service-categories', () => getServiceCategory(0));

	if (siteSettingsLoading || serviceCategoriesLoading) {
		return <LoadingSpinner />;
	}

	// navigate to Services Page
	const navigateToServices = (id) => {
		window.scrollTo(0, 0);
		navigate(`/${id}`);
	};

	const navigateToAbout = () => {
		window.scrollTo(0, 0);
		navigate('/about');
	};

	const closeMenu = () => {
		setIsMenuOpen(false); // function to toggle the menu
	};

	const isMobile = window.innerWidth <= 768;

	return (
		<div className="navbar fixSection  ">
			<div className="navbar__left" key={siteSettings?.id}>
				<Link to="/">
					{/* Render different logos for mobile and desktop */}
					{isMobile ? (
						<img src={getFileUrl(siteSettings?.mobileLogo)} alt="Mobile Logo" />
					) : (
						<img
							src={getFileUrl(siteSettings?.headerLogo)}
							alt="Desktop Logo"
						/>
					)}
				</Link>
				<GiHamburgerMenu
					className="sideBar__Button selector"
					style={{ color: headerTextColor }}
					onClick={() => setIsMenuOpen(!isMenuOpen)} // Add an onClick handler to toggle the menu.
				/>
				{isMenuOpen && ( // Render the menu list only if isMenuOpen is true.
					<ul
						className="sideBar__MenuList"
						style={{
							color: 'white',
							overflowY: dropdownStates.some((state) => state)
								? 'auto'
								: 'hidden',
						}}
					>
						<div className="close-button" onClick={closeMenu}>
							&times;
						</div>
						<div className="sideBar__MenuContent">
							{serviceCategories?.map((serviceCategory, index) => (
								<li
									className="sideBar__MenuItem sideBar__DropDown"
									onClick={() => toggleMenu(index)}
									key={serviceCategory?.id}
								>
									{serviceCategory?.title}
									{/* <BsChevronDown className="navbar__icons" /> */}
									{openDropdownIndex === index && (
										<ul className="sideBar__DropDownList">
											{serviceCategory?.services.map((service) => (
												<li
													className="sideBar__ListItem"
													key={service?.id}
													onClick={() => {
														navigateToServices(service?.slug);
														closeMenu();
													}}
												>
													{service?.title}
												</li>
											))}
										</ul>
									)}
								</li>
							))}
							<li className="sideBar__MenuItem">
								<div
									className="navbar__link about"
									onClick={() => {
										navigateToAbout();
										closeMenu();
									}}
								>
									About Us
								</div>
							</li>
						</div>
					</ul>
				)}
			</div>

			<div className="navbar__center">
				<ul className="navbar__list" style={{ color: headerTextColor }}>
					{serviceCategories?.map((serviceCategory, index) => (
						<li
							className="navbar__listItem navbar__DropDown"
							key={serviceCategory?.id}
							// onMouseEnter={() => toggleMenu(index)}
							// onMouseLeave={() => toggleMenu(index)}
						>
							{/* Regular Menu using list */}
							{serviceCategory?.title}
							<BsChevronDown className="navbar__icons" />
							{/* {openDropdownIndex === index && ( */}
							<ul className="dropdown__list box-shadow">
								<div className="serviceCategory bgSection__blue">
									<div className="serviceCategory__title">
										{serviceCategory?.title}
									</div>
									<div className="serviceCategory__Desc megaMenu__Desc">
										{removeHtml(serviceCategory?.description)}
									</div>
								</div>

								<div className="services__list">
									{serviceCategory?.services.map((service) => (
										<div
											className="services__listItem"
											key={service?.id}
											onClick={() => navigateToServices(service?.slug)}
										>
											<span className="services__listImage">
												<img
													src={getFileUrl(service?.icon)}
													className="service__Image"
													alt="service image"
												/>
											</span>

											<div className="services__listDesc">
												<div className="services__listTitle">
													{service?.title}
												</div>
												<div className="serviceCategory__Desc">
													{removeHtml(service?.shortDescription).slice(0, 80)}
													...
												</div>
											</div>
										</div>
									))}
								</div>
							</ul>
							{/* )} */}
						</li>
					))}

					<li className="navbar__listItem">
						<div className="navbar__link" onClick={navigateToAbout}>
							About Us
						</div>
					</li>
				</ul>
			</div>

			<div className="navbar__right">
				<a href={`tel:${siteSettings?.phone}`}>
					<PiPhoneCallFill
						className="navbarRight__icons"
						style={{ color: currentRoute === '/' ? 'white' : '#F7941D' }}
					/>
				</a>
				<div
					className="navbar__rightContent navbar__rightNum"
					style={{ color: headerTextColor }}
				>
					<a
						href={`tel:${siteSettings?.phone}`}
						className="navbar__NumLink"
						style={{ color: headerTextColor }}
					>
						{siteSettings?.phone}
					</a>
				</div>
			</div>
		</div>
	);
};

export default Header;
