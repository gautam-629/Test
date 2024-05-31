import React from 'react';
import './Stats.css';

import { removeHtml } from '../../utils/removeHtml';

const Stats = ({ serviceStats }) => {
	return (
		<section>
			<div className="stats fixSection">
				{serviceStats.map((stat) => (
					<div className="stats__col" key={stat.id}>
						<div className="stats__col__title">{stat.title}</div>
						<div className="stats__col__titleSub">
							{removeHtml(stat.description)}
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default Stats;
