import clsx from "clsx";
import styles from "../Header.module.scss";
import HeaderNavLinks from "./HeaderNavLinks.jsx";
import HeaderCart from "./HeaderCart.jsx";

function DesktopHeader({ cartCount }) {
    return (
        <header className={clsx(styles.header, styles.desktopHeader)}>
            <nav className={styles.nav}>
                <HeaderNavLinks />
                <HeaderCart cartCount={cartCount} />
            </nav>
        </header>
    );
}

export default DesktopHeader;
