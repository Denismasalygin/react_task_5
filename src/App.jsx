import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    useLocation,
} from 'react-router-dom';

import Header from './components/header/Header.jsx';

import Home from './pages/home/Home.jsx';
import Contacts from './pages/contact/Contacts.jsx';
import Shop from './pages/Shop.jsx';
import Cart from "./pages/Cart.jsx";

function AppContent() {
    const {pathname} = useLocation();
    const isHomePage = pathname === '/';

    return (
        <div className={isHomePage ? 'app app--home' : 'app'}>
            <Header/>

            <main className="main">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/contacts" element={<Contacts/>}/>
                    <Route path="/shop" element={<Shop/>}/>
                    <Route path="/cart" element={<Cart/>}/>

                    <Route path="/wallet" element={<Navigate to="/contacts" replace/>}/>
                    <Route path="/plots" element={<Navigate to="/contacts" replace/>}/>

                    <Route path="*" element={<Navigate to="/" replace/>}/>
                </Routes>
            </main>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AppContent/>
        </BrowserRouter>
    );
}

export default App;