import styles from "../Header.module.scss";
import HeaderNavLinks from "./HeaderNavLinks.jsx";

function MobileMenu({ onClose }) {
    return (
        <div className={styles.menuOverlay} onClick={onClose}>
            <nav
                id="mobile-navigation"
                className={styles.mobileMenu}
                aria-label="Мобильная навигация"
                onClick={(event) => event.stopPropagation()}
            >
                <HeaderNavLinks onLinkClick={onClose} />
            </nav>
        </div>
    );
}

export default MobileMenu;
