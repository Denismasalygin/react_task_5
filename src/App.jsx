import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/header/Header.jsx';

import Home from './pages/Home.jsx';
import Contacts from './pages/Contacts.jsx';
import Shop from './pages/Shop.jsx';
import Cart from "./pages/Cart.jsx";

function App() {
    return (
        <BrowserRouter>
            <Header />

            <main className="main">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/shop" element={<Shop />} />

                    <Route path="/wallet" element={<Navigate to="/contacts" replace />} />
                    <Route path="/plots" element={<Navigate to="/contacts" replace />} />

                    <Route path="/cart" element={<Cart />} />

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;