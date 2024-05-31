import axios from '../../utils/axios';

export const getSiteSettings = async () => {
	const response = await axios.get('/site-settings');
	return await response?.data?.data;
};
