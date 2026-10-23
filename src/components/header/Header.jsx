import { useSelector } from "react-redux";
import DesktopHeader from "./components/DesktopHeader.jsx";
import MobileHeader from "./components/MobileHeader.jsx";

function Header() {
    const cartCount = useSelector((state) => state.cart.items.length);

    return (
        <>
            <DesktopHeader cartCount={cartCount} />
            <MobileHeader cartCount={cartCount} />
        </>
    );
}

export default Header;
