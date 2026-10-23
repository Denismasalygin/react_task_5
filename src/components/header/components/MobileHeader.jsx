import { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "../Header.module.scss";
import BurgerIcon from "../../../../public/icons/burger/BurgerIcon.jsx";
import HeaderNavLinks from "./HeaderNavLinks.jsx";
import HeaderCart from "./HeaderCart.jsx";

function MobileHeader({ cartCount }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => setIsMenuOpen(false);

    useEffect(() => {
        if (!isMenuOpen) return undefined;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isMenuOpen]);

    return (
        <>
            <header className={clsx(styles.header, styles.mobileHeader)}>
                <button
                    type="button"
                    className={styles.burgerButton}
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-navigation"
                >
                    <BurgerIcon />
                </button>

                <HeaderCart cartCount={cartCount} />
            </header>

            {isMenuOpen && (
                <div className={styles.menuOverlay} onClick={closeMenu}>
                    <nav
                        id="mobile-navigation"
                        className={styles.mobileMenu}
                        aria-label="Мобильная навигация"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <HeaderNavLinks onLinkClick={closeMenu} />
                    </nav>
                </div>
            )}
        </>
    );
}

export default MobileHeader;
