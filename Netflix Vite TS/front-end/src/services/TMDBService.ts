import { api } from '../baseConfig';
import { MoviesData, MovieList, MovieInfo } from '../types';
const EMPTY_MOVIEINFO = {
	id: 0,
	original_name: '',
	backdrop_path: '',
	vote_average: 0,
	number_of_seasons: 0,
	overview: '',
	first_air_date: '',
	genres: [],
};

const TMDB_KEY = import.meta.env.VITE_TMDB_KEY;
const basicFetch = async (endpoint: string): Promise<MoviesData[]> => {
	try {
		const res = await api
			.get(endpoint)
			.then((data) => {
				return data.data.results;
			})
			.catch((error) => console.log(error));
		return res;
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error;
	}
};

const singleMovieFetch = async (endpoint: string): Promise<MovieInfo> => {
	try {
		const res = await api
			.get(endpoint)
			.then((data) => {
				return data.data;
			})
			.catch((error) => console.log(error));
		return res;
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error;
	}
};

export const getHomeList = async (): Promise<MovieList[]> => {
	return [
		{
			slug: 'originals',
			title: 'Originais da Netflix',
			itens: await basicFetch(
				`/discover/tv?with_network=213&language=pt-BR&api_key=${TMDB_KEY}`
			),
		},
		{
			slug: 'trending',
			title: 'Recomendados para Você',
			itens: await basicFetch(
				`/trending/all/week?language=pt-BR&api_key=${TMDB_KEY}`
			),
		},
		{
			slug: 'toprated',
			title: 'Em Alta',
			itens: await basicFetch(
				`/movie/top_rated?language=pt-BR&api_key=${TMDB_KEY}`
			),
		},
		{
			slug: 'action',
			title: 'Ação',
			itens: await basicFetch(
				`discover/movie?with_genres=28&language=pt-BR&api_key=${TMDB_KEY}`
			),
		},
		{
			slug: 'comedy',
			title: 'Comédia',
			itens: await basicFetch(
				`discover/movie?with_genres=35&language=pt-BR&api_key=${TMDB_KEY}`
			),
		},
		{
			slug: 'horror',
			title: 'Terror',
			itens: await basicFetch(
				`discover/movie?with_genres=27&language=pt-BR&api_key=${TMDB_KEY}`
			),
		},
		{
			slug: 'romance',
			title: 'Romance',
			itens: await basicFetch(
				`discover/movie?with_genres=1074&language=pt-BR&api_key=${TMDB_KEY}`
			),
		},
		{
			slug: 'documentary',
			title: 'Documentários',
			itens: await basicFetch(
				`discover/movie?with_genres=99&language=pt-BR&api_key=${TMDB_KEY}`
			),
		},
	];
};

export const getMovieInfo = async (
	movieID: number,
	type: string
): Promise<MovieInfo> => {
	let movieInfo: MovieInfo = EMPTY_MOVIEINFO;

	if (movieID) {
		switch (type) {
			case 'movie':
				movieInfo = await singleMovieFetch(
					`/movie/${movieID}?api_key=${TMDB_KEY}`
				);
				break;
			case 'tv':
				movieInfo = await singleMovieFetch(
					`/tv/${movieID}?api_key=${TMDB_KEY}`
				);
				break;
		}
	}

	return movieInfo;
};
