import {NavLink} from 'react-router-dom';
import styles from './Header.module.scss';
import clsx from "clsx";
import CartIcon from "../../../public/icons/cart/CartIcon.jsx";
import {useSelector} from "react-redux";
import Tooltip from "../tooltip/Tooltip.jsx";

const getNavLinkClass = ({isActive}, activeClass = styles.navLinkActive) =>
    clsx(styles.navLink, {
        [activeClass]: isActive,
    });

function Header() {
    const cartCount = useSelector((state) => state.cart.items.length);
    return (
        <header className={styles.header}>
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
