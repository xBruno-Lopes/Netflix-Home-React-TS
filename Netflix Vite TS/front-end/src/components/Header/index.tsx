import { FC } from 'react';
import { HeaderProps } from '../../types';
import './styles.css';

const Header: FC<HeaderProps> = ({ activeBlackColor }) => {
	return (
		<header className={activeBlackColor ? 'black' : ''}>
			<div className='header--logo'>
				<a href='/'>
					<img
						src='https://upload.wikimedia.org/wikipedia/commons/e/ea/Netflix_Logomark.png'
						alt='header logo'
					></img>
				</a>
			</div>
			<div className='header--user'>
				<a href='/'>
					<img
						src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
						alt='header user'
					></img>
				</a>
			</div>
		</header>
	);
};

export default Header;
