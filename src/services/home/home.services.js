import axios from '../../utils/axios';

export const getTestimonials = async (skip, limit) => {
	const params = new URLSearchParams();
	params.set('skip', skip);
	params.set('filterBy', 'all');
	if (limit) params.set('limit', limit);
	const response = await axios.get('/testimonials', { params });
	return await response?.data?.data;
};

export const getServices = async (skip, limit) => {
	const params = new URLSearchParams();
	params.set('skip', skip);
	params.set('filterBy', 'all');
	if (limit) params.set('limit', limit);
	const response = await axios.get('/services', { params });
	return await response?.data?.data;
};

export const getCMS = async (slug, limit) => {
	const params = new URLSearchParams();
	params.set('filterBy', 'all');
	if (limit) params.set('limit', limit);
	const response = await axios.get(`/cms/${slug}`, { params });
	return await response?.data?.data?.childPages;
};

export const getReviews = async (skip, limit) => {
	const params = new URLSearchParams();
	params.set('skip', skip);
	if (limit) params.set('limit', limit);
	const response = await axios.get('/reviews', { params });
	return await response?.data?.data;
};

export const getCMSPageName = async (slug, limit) => {
	const params = new URLSearchParams();
	params.set('filterBy', 'all');
	if (limit) params.set('limit', limit);
	const response = await axios.get(`/cms/${slug}`, { params });
	return await response?.data?.data;
};
