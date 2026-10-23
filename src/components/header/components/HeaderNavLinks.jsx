import { NavLink } from "react-router-dom";
import { navLinks } from "../constants/navigationLinks.js";
import {getNavLinkClass} from "../utils/getNavLinkClass.js";

function HeaderNavLinks({ onLinkClick }) {
    return navLinks.map(({ key, to, label, end }) => (
        <NavLink
            key={key}
            to={to}
            end={end}
            className={getNavLinkClass}
            onClick={onLinkClick}
        >
            {label}
        </NavLink>
    ));
}

export default HeaderNavLinks;
