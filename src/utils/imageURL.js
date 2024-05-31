const API_URL = process.env.NEXT_PUBLIC_.API_URL;

export const getFileUrl = (image) => {
	return `${API_URL}${image}`;
};
