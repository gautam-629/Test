import axios from '../../utils/axios';

export const getApproaches = async (id, skip) => {
	const params = new URLSearchParams();
	params.set('skip', skip);
	params.set('take', 5);

	const response = await axios.get(`/services/approaches/${id}`, { params });
	return await response?.data?.data;
};

export const getService = async (slug) => {
	const params = new URLSearchParams();

	const response = await axios.get(`/services/${slug}`, { params });
	return await response?.data?.data;
};

export const getValues = async (skip, serviceId) => {
	const params = new URLSearchParams();
	params.set('skip', skip);
	params.set('serviceId', serviceId);

	const response = await axios.get('/values', { params });
	return await response?.data?.data;
};

export const getServiceCategory = async (skip) => {
	const params = new URLSearchParams();
	params.set('skip', skip);

	const response = await axios.get('/service-category/services', { params });
	return await response?.data?.data;
};

export const getServiceStats = async (skip, serviceId) => {
	const params = new URLSearchParams();
	params.set('take', 5);
	params.set('skip', skip);
	params.set('serviceId', serviceId);
	// console.log(serviceId.toString());

	const response = await axios.get('/stats', { params });
	return await response?.data?.data;
};

export const getServiceStrength = async (skip, serviceId) => {
	const params = new URLSearchParams();
	params.set('take', 5);
	params.set('skip', skip);
	params.set('serviceId', serviceId);

	const response = await axios.get('/Strength', { params });
	return await response?.data?.data;
};
