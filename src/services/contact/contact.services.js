import axios from '../../utils/axios';

export const submitContactForm = async (formData) => {
	const response = await axios.post('/contact-us', formData, {
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response?.data?.message;
};
