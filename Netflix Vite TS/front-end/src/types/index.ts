export interface MovieList {
	slug: string;
	title: string;
	itens: MoviesData[];
}

export interface MovieRowProps {
	title: string;
	itens: MoviesData[];
}

export interface MoviesData {
	name: string;
	poster_path: string;
	adult: boolean;
	vote_average: number;
	id: number;
}

export interface MovieInfo {
	id: number;
	original_name: string;
	backdrop_path: string;
	vote_average: number;
	number_of_seasons: number;
	overview: string;
	first_air_date: string;
	genres: MoviesGenres[];
}

export interface FeaturedMovieProps {
	info: MovieInfo;
}

export interface MoviesGenres {
	id: number;
	name: string;
}

export interface HeaderProps {
	activeBlackColor: boolean;
}
