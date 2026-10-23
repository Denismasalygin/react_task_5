import { NavLink } from "react-router-dom";
import styles from "../Header.module.scss";
import CartIcon from "../../../../public/icons/cart/CartIcon.jsx";
import Tooltip from "../../tooltip/Tooltip.jsx";
import { getNavLinkClass } from "../utils/getNavLinkClass.js";

function HeaderCart({ cartCount }) {
    return (
        <Tooltip text={`Корзина: ${cartCount}`}>
            <NavLink
                to="/cart"
                className={(props) =>
                    getNavLinkClass(props, styles.cartLinkActive)
                }
                aria-label={`Корзина, товаров: ${cartCount}`}
            >
                <CartIcon count={cartCount} />
            </NavLink>
        </Tooltip>
    );
}

export default HeaderCart;
