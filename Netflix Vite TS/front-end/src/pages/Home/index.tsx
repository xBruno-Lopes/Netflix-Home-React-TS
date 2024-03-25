import { FC, useEffect, useState } from 'react';
import { getHomeList, getMovieInfo } from '../../services/TMDBService';
import MovieRow from '../../components/MovieRow';
import FeaturedData from '../../components/FeaturedMovie';
import Header from '../../components/Header';
import { MovieList, MovieInfo } from '../../types';
import './styles.css';

const Home: FC = () => {
	const [movieList, setMovieList] = useState<MovieList[]>([]);
	const [featuredData, setFeaturedData] = useState<MovieInfo>();
	const [activeBlackHeader, setActiveBlackHeader] = useState<boolean>(false);
	useEffect(() => {
		const loadAll = async () => {
			const list = await getHomeList();
			setMovieList(list);

			const originalsNetflix = list.filter((elem) => elem.slug === 'originals');
			const ramdomOriginals = Math.floor(
				Math.random() * originalsNetflix[0].itens.length - 1
			);
			const chosen = originalsNetflix[0].itens[ramdomOriginals];
			const chosenInfo = await getMovieInfo(chosen.id, 'tv');
			console.log(chosenInfo);
			setFeaturedData(chosenInfo);
		};

		loadAll();
	}, []);

	useEffect(() => {
		const scrollListener = () => {
			if (window.scrollY > 10) {
				setActiveBlackHeader(true);
			} else {
				setActiveBlackHeader(false);
			}
		};
		window.addEventListener('scroll', scrollListener);

		return () => {
			window.removeEventListener('scroll', scrollListener);
		};
	}, []);

	return (
		<div className='home'>
			<Header activeBlackColor={activeBlackHeader}></Header>
			{featuredData && <FeaturedData info={featuredData}></FeaturedData>}
			<section className='movieList'>
				{movieList.map((item: MovieList, key: number) => (
					<MovieRow key={key} title={item.title} itens={item.itens}></MovieRow>
				))}
			</section>
			<footer>
				<div>
					Feito com carinho
					<span role='img' aria-label='coração'>
						❤️
					</span>
					por xBrunoLopes
				</div>
				<div>Direitos de imagem para Netflix</div>
				<div>Dados coletados de themoviedb.org</div>
			</footer>
			{movieList.length <= 0 && (
				<div className='loadingScreen'>
					<img
						src='https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_1920,c_limit/Netflix_LoadTime.gif'
						width='50%'
						height='50%'
						alt='loading'
					></img>
				</div>
			)}
		</div>
	);
};

export default Home;
