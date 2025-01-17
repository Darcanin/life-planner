import { Link } from 'react-router-dom'
import style from './Header.module.sass'
import { pageConfig } from '../../../config/page.config'

const Header = () => {
	return (
		<header className={style.header}>
			<nav className={style.nav}>
				<Link to={pageConfig.home}>Home</Link>
				<Link to={pageConfig.task}>Tasks</Link>
				<Link to={pageConfig.goal}>Goals</Link>
			</nav>
		</header>
	)
}

export default Header
