import Axios from 'axios';
export const baseURL = 'https://api.themoviedb.org';

export const api = Axios.create({
	baseURL: `${baseURL}/3`,
	timeout: 1000,
});
