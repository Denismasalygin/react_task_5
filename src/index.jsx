import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/global.css';
import { Provider } from 'react-redux';
import {store} from "./store/store";

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error('Root element was not found in index.html');
}

createRoot(rootElement).render(
    <Provider store={store}>
        <App />
    </Provider>
);
