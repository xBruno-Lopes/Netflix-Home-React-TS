import { FC } from 'react';
import './styles.css';
import { FeaturedMovieProps } from '../../types';

const FeaturedData: FC<FeaturedMovieProps> = ({ info }) => {
	const firstDate = new Date(info.first_air_date);
	const genresInfo: string[] = [];

	for (const i in info.genres) {
		genresInfo.push(info.genres[i].name);
	}

	let movieDescription = info.overview;
	if (movieDescription.length > 200) {
		movieDescription = movieDescription.substring(0, 200) + '...';
	}

	return (
		<section
			className='featured'
			style={{
				backgroundImage: `url(https://image.tmdb.org/t/p/original${info.backdrop_path})`,
			}}
		>
			<div className='featured--verticalFade'>
				<div className='featured--horizontalFade'>
					<div className='featured--name'>{info.original_name}</div>
					<div className='featured--info'>
						<div className='featured--points'>{info.vote_average} pontos</div>
						<div className='featured--year'>{firstDate.getFullYear()}</div>
						<div className='featured--seasons'>
							{info.number_of_seasons} Temporada
							{info.number_of_seasons !== 1 ? 's' : ''}
						</div>
					</div>
					<div className='featured--description'>{movieDescription}</div>
					<div className='featured--buttons'>
						<a href={`/watch/${info.id}`} className='featured--watchButton'>
							{' '}
							▶ Assistir
						</a>
						<a href={`/list/add/${info.id}`} className='featured--myListButton'>
							+ Minha Lista
						</a>
					</div>
					<div className='featured--genres'>
						<strong>Gêneros: </strong> {genresInfo.join(', ')}
					</div>
				</div>
			</div>
		</section>
	);
};

export default FeaturedData;
