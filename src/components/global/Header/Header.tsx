import { Link } from "react-router-dom";
import style from "./Header.module.sass";

const Header = () => {
	return (
		<header className={style.header}>
			<nav className={style.nav}>
				<Link to="/">Home</Link>
				<Link to="/tasks">Tasks</Link>
				<Link to="/goals">Goals</Link>
			</nav>
		</header>
	);
};

export default Header;
