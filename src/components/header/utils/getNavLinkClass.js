import styles from "../Header.module.scss";
import clsx from "clsx";

export const getNavLinkClass = ({isActive}, activeClass = styles.navLinkActive) =>
    clsx(styles.navLink, {
        [activeClass]: isActive,
    });