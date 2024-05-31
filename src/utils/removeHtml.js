export function removeHtml(htmlStr) {
	return htmlStr?.replace(/(<([^>]+)>)/gi, '')?.replace(/&nbsp;/gi, ' ');
}
