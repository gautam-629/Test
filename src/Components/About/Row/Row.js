import React from 'react';
import './Row.css';

import { removeHtml } from '../../../utils/removeHtml';
import { getFileUrl } from '../../../utils/imageURL';

const Row = ({ homeCMS }) => {
	return (
		<>
			<div className="row">
				<div className="r-img-wrapper">
					<img src={getFileUrl(homeCMS?.[11]?.image)} />
				</div>
				<div className="r-inner-content">
					<div className="heading r-heading">{homeCMS?.[11]?.title}</div>
					<div className="inner-title">
						{removeHtml(homeCMS?.[11]?.description)}
					</div>
				</div>
			</div>
			<div className="row">
				<div className="r-img-wrapper">
					<img src={getFileUrl(homeCMS?.[12]?.image)} />
				</div>
				<div className="r-inner-content">
					<div className="heading r-heading">{homeCMS?.[12]?.title}</div>
					<div className="inner-title">
						{removeHtml(homeCMS?.[12]?.description)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Row;
