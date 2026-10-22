import {NavLink} from 'react-router-dom';
import styles from './Header.module.scss';
import clsx from "clsx";
import CartIcon from "../../../public/icons/cart/CartIcon.jsx";
import {useSelector} from "react-redux";
import Tooltip from "../tooltip/Tooltip.jsx";

const navLinks = [
    { key: 'home', to: '/', label: 'Главная', end: true },
    { key: 'contacts', to: '/contacts', label: 'Контакты' },
    { key: 'shop', to: '/shop', label: 'Магазин' },
    { key: 'wallet', to: '/wallet', label: 'Кошелёк' },
    { key: 'plots', to: '/plots', label: 'Участки' },
];

const getNavLinkClass = ({ isActive }, activeClass = styles.navLinkActive) =>
    clsx(styles.navLink, {
        [activeClass]: isActive,
    });

function Header() {
    const cartCount = useSelector((state) => state.cart.items.length);

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                {navLinks.map(({ key, to, label, end }) => (
                    <NavLink
                        key={key}
                        to={to}
                        end={end}
                        className={getNavLinkClass}
                    >
                        {label}
                    </NavLink>
                ))}

                <Tooltip text={`Корзина: ${cartCount}`}>
                    <NavLink
                        to="/cart"
                        className={(props) =>
                            getNavLinkClass(props, styles.cartLinkActive)
                        }
                        aria-label={`Корзина, товаров: ${cartCount}`}
                    >
                        <CartIcon count={cartCount}/>
                    </NavLink>
                </Tooltip>
            </nav>
        </header>
    );

}

export default Header;
