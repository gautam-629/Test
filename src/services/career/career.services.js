import axios from '../../utils/axios';

export const getCareers = async (skip, limit) => {
	const params = new URLSearchParams();
	params.set('skip', skip);
	params.set('filterBy', 'all');
	if (limit) params.set('limit', limit);
	const response = await axios.get('/careers', { params });
	return await response?.data?.data;
};

export const getCareerCategories = async (skip, limit) => {
	const params = new URLSearchParams();
	params.set('skip', skip);
	params.set('filterBy', 'all');
	if (limit) params.set('limit', limit);
	const response = await axios.get('/careers/category', { params });
	return await response?.data?.data;
};

export const submitCareerForm = async (formData) => {
	const response = await axios.post('/careers/applications', formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
	return response?.data?.message;
};

export const getCareer = async (id) => {
	const params = new URLSearchParams();

	const response = await axios.get(`/careers/${id}`, { params });
	return await response?.data?.data;
};
