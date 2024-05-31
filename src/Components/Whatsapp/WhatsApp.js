import React, { useEffect } from 'react';
import WhatsAppWidget from 'react-whatsapp-chat-widget';
import './WhatsApp.css';

const WhatsApp = () => {
	useEffect(() => {
		const handleIconClick = (event) => {
			event.stopPropagation();
			event.preventDefault();
		};

		// Attach the event listener
		const widgetIcon = document.querySelector('.whatsapp-icon-wrapper');
		if (widgetIcon) {
			widgetIcon.addEventListener('click', handleIconClick);
		}

		// Clean up the event listener
		return () => {
			if (widgetIcon) {
				widgetIcon.removeEventListener('click', handleIconClick);
			}
		};
	}, []);

	return (
		// <WhatsAppWidget
		// phoneNo="+61420891838"
		// position="right"
		// widgetWidth="300px"
		// widgetWidthMobile="260px"
		// autoOpen={true}
		// autoOpenTimer={5000}
		// messageBox={true}
		// messageBoxTxt="Hi Team, is there any related service available ?"
		// iconSize="40"
		// iconColor="white"
		// iconBgColor="#25D366"
		// headerIcon="https://api.humanxglobal.com//uploads/2024-02/unauth-1708426433269-3b37b33b4c4f449da8972a8a8c438661.png"
		// headerIconColor="pink"
		// headerTxtColor="black"
		// headerBgColor="#25D366"
		// headerTitle="HumanX"
		// headerCaption="Online"
		// bodyBgColor="#bbb"
		// chatPersonName="Support"
		// chatMessage={<>Hi there 👋 <br /><br /> How can I help you?</>}
		// footerBgColor="#999"
		// placeholder="Type a message.."
		// btnBgColor="#25D366"
		// btnTxt="Start Chat"
		// btnTxtColor="black"
		// />

		<div className="whatsapp-chat-widget">
			<div className="whatsapp-icon-wrapper">
				<WhatsAppWidget
					phoneNo="+61420891838"
					iconSize="40"
					iconColor="white"
					iconBgColor="#25D366"
					headerIcon="https://api.humanxglobal.com//uploads/2024-02/unauth-1708426433269-3b37b33b4c4f449da8972a8a8c438661.png"
				/>
			</div>
		</div>
	);
};

export default WhatsApp;
