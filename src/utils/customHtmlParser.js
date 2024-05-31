import React from 'react';
import parse from 'html-react-parser';

function CustomHtmlParser(htmlContent) {
	// Define a function to add CSS classes to list items
	const addClassesToElements = (node) => {
		if (
			node.type === 'tag' &&
			(node.name === 'li' || node.name === 'ul' || node.name === 'ol')
		) {
			// Add your CSS class here based on the element type
			if (node.name === 'li') {
				node.attribs = {
					...node.attribs,
					className: 'job__ListItem',
				};
			} else if (node.name === 'ol') {
				node.attribs = {
					...node.attribs,
					className: 'job__List',
				};
			} else if (node.name === 'ul') {
				node.attribs = {
					...node.attribs,
					className: 'job__List',
				};
			} else if (node.type === 'tag' && node.name === 'strong') {
				node.attribs = {
					...node.attribs,
					className: 'job__contentTitle',
				};
			}
		}
		return node;
	};

	// Parse the HTML content and add CSS classes to list items
	const parsedHtml = parse(htmlContent, {
		replace: addClassesToElements,
	});

	return <div>{parsedHtml}</div>;
}

export default CustomHtmlParser;
