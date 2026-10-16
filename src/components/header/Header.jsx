import {NavLink} from 'react-router-dom';
import styles from './Header.module.scss';
import clsx from "clsx";
import CartIcon from "../../../public/icons/cart/CartIcon.jsx";

const getNavLinkClass = ({isActive}, activeClass = styles.navLinkActive) =>
    clsx(styles.navLink, {
        [activeClass]: isActive,
    });

function Header() {
    return (
        <header className={clsx("DmSans", styles.header)}>
            <nav className={styles.nav}>
                <NavLink to="/" end className={getNavLinkClass}>
                    Главная
                </NavLink>

                <NavLink to="/contacts" className={getNavLinkClass}>
                    Контакты
                </NavLink>

                <NavLink to="/shop" className={getNavLinkClass}>
                    Магазин
                </NavLink>

                <NavLink to="/wallet" className={getNavLinkClass}>
                    Кошелёк
                </NavLink>

                <NavLink to="/plots" className={getNavLinkClass}>
                    Plots
                </NavLink>

                <NavLink
                    to="/cart"
                    className={(props) => getNavLinkClass(props, styles.cartLinkActive)}
                    title='Корзина'
                >
                    <CartIcon/>
                </NavLink>
            </nav>
        </header>
    );
}

export default Header;