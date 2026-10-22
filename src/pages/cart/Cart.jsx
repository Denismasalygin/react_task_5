import {useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styles from './Cart.module.scss';
import ShopControls from '../../components/shopControls/ShopControls.jsx';
import PlotCard from '../../components/plotCard/PlotCard.jsx';
import PlotMap from '../../components/plotMap/PlotMap.jsx';
import PlotModal from '../../components/plotModal/PlotModal.jsx';
import {clearCart} from '../../store/cartSlice.js';
import {getShopPrice} from '../shop/utils/shopHelpers.js';
import {filterAndSortShopItems} from '../shop/utils/shopSelectors.js';
import {getCities} from '../../utils/getCities.js';

function Cart() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const [sortBy, setSortBy] = useState(null);
    const [city, setCity] = useState('all');
    const [showMap, setShowMap] = useState(false);
    const [selectedPlot, setSelectedPlot] = useState(null);

    const isEmpty = cartItems.length === 0;

    const cities = getCities(cartItems);

    const filteredItems = useMemo(
        () => filterAndSortShopItems(cartItems, city, sortBy),
        [cartItems, city, sortBy]
    );

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + getShopPrice(item.id),
        0
    );

    return (
        <section className="page">
            {!isEmpty && (<ShopControls
                cities={cities}
                city={city}
                onCityChange={setCity}
                sortBy={sortBy}
                onSortChange={() =>
                    setSortBy((current) => {
                        if (current === null) return 'asc';
                        if (current === 'asc') return 'desc';
                        return null;
                    })
                }
                showMap={showMap}
                onToggleMap={() => setShowMap((current) => !current)}
                onClearCart={
                    !isEmpty
                        ? () => dispatch(clearCart())
                        : undefined
                }
            />)}

            {isEmpty ? (
                <h1 className={styles.emptyMessage}>
                    Ваша корзина пока пуста
                </h1>
            ) : (
                <>
                    {showMap ? (
                        <PlotMap
                            items={filteredItems}
                            onMarkerClick={setSelectedPlot}
                        />
                    ) : (
                        <div className={styles.grid}>
                            {filteredItems.map((item) => (
                                <PlotCard
                                    key={item.id}
                                    plot={item}
                                    onSelect={setSelectedPlot}
                                />
                            ))}
                        </div>
                    )}

                    <div className={styles.summary}>
                        <p className={styles.summaryDetails}>
                            Участков:
                            <span>{cartItems.length}</span>
                        </p>

                        <p className={styles.summaryDetails}>
                            Общая стоимость:
                            <span>{totalPrice.toLocaleString('ru-RU')}</span>
                            {'\u20BD'}
                        </p>
                    </div>
                </>
            )}

            <PlotModal plot={selectedPlot} onClose={() => setSelectedPlot(null)}/>
        </section>
    );
}

export default Cart;
