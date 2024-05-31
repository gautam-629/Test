import axios from '../../utils/axios';

export const getBlogs = async (skip, take) => {
	const params = new URLSearchParams();
	params.set('skip', skip);
	params.set('filterBy', 'all');
	if (take) params.set('take', take);
	const response = await axios.get('/blogs', { params });
	return await response?.data;
};

export const getBlog = async (slug) => {
	const params = new URLSearchParams();

	const response = await axios.get(`/blogs/${slug}`, { params });
	return await response?.data?.data;
};

export const getFirstBlog = async (skip, take) => {
	const params = new URLSearchParams();
	params.set('skip', skip);
	params.set('take', take);
	params.set('filterBy', 'all');
	const response = await axios.get(`/blogs`, { params });
	return await response?.data?.data;
};

export const getBlogReviews = async () => {
	const response = await axios.get('/blog-review');
	return await response?.data;
};

export const submitBlogReview = async (requestData) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const response = await axios.post('/blog-review', requestData, config);
	return response?.data;
};
