import { FC, useState } from 'react';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import './styles.css';
import { MoviesData, MovieRowProps } from '../../types';

const MovieRow: FC<MovieRowProps> = ({ title, itens }) => {
	const [scrollX, setScrollX] = useState<number>(0);

	const handleNavigateLeft = () => {
		let horizontalScroll = scrollX + Math.round(window.innerWidth / 2);
		if (horizontalScroll >= 0) {
			horizontalScroll = 0;
		}
		setScrollX(horizontalScroll);
	};
	const handleNavigateRight = () => {
		let horizontalScroll = scrollX - Math.round(window.innerWidth / 2);
		const listWidth = itens.length * 150;
		if (window.innerWidth - listWidth > horizontalScroll) {
			horizontalScroll = window.innerWidth - listWidth - 60;
		}
		setScrollX(horizontalScroll);
	};

	return (
		<div className='movieRow'>
			<h2>{title}</h2>
			<div className='movieRow--leftIcon' onClick={handleNavigateLeft}>
				<NavigateBeforeIcon style={{ fontSize: 50 }}></NavigateBeforeIcon>
			</div>
			<div className='movieRow--rightIcon' onClick={handleNavigateRight}>
				<NavigateNextIcon style={{ fontSize: 50 }}></NavigateNextIcon>
			</div>
			<div className='movieRow--listArea'>
				<div
					className='movieRow--list'
					style={{ marginLeft: scrollX, width: itens.length * 150 }}
				>
					{itens.length > 0 &&
						itens.map((item: MoviesData, key: number) => (
							<div className='movieRow--item' key={key}>
								<img
									src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
									height='210px'
									alt='movie_poster'
								></img>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default MovieRow;
