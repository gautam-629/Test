import axios from '../../utils/axios';

export const getTeam = async (skip, limit) => {
	const params = new URLSearchParams();
	params.set('skip', skip);
	params.set('filterBy', 'all');
	if (limit) params.set('limit', limit);
	const response = await axios.get('/our-team', { params });
	return await response?.data?.data;
};

export const getGallery = async (slug, limit) => {
	const params = new URLSearchParams();
	if (limit) params.set('limit', limit);
	const response = await axios.get(`/gallery/${slug}`, { params });
	return await response?.data?.data;
};
