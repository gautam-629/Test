import React from 'react';
import parse from 'html-react-parser';

const htmlParser = (htmlContent) => {
	// Functino to add CSS classes to parsed html elements
	const addCSSClasses = (node) => {
		if (node.type === 'tag') {
			// Add css classes based on element type
			switch (node.name) {
				case 'strong':
					node.attribs = {
						...node.attribs,
						className: 'text-bold',
					};
					break;
				// case 'p':
				// 	node.attribs = {
				// 		className: 'text-justify',
				// 	};
				// 	break;
				case 'a':
					node.attribs = {
						className: 'text-plain',
						// Preserve original href attribute
						href: node.attribs.href,
						target: '_blank',
						// Apply inline styles if available
						style: node.attribs.style ? node.attribs.style : null,
					};
					break;
				// default:
				// 	node.attribs = {
				// 		...node.attribs,
				// 		className: 'text-justify',
				// 	};
				// 	break;
			}
		}

		return node;
	};

	// Parse the Html Content and add CSS classes
	const parsedContent = parse(htmlContent, {
		replace: addCSSClasses,
	});
	return <div>{parsedContent}</div>;
};

export default htmlParser;
