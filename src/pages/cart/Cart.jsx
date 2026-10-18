import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';

import styles from './Cart.module.scss';
import {
    getShopArea,
    getShopPrice,
    getShopImage,
} from '../shop/utils/shopHelpers.js';
import { removeFromCart, clearCart } from '../../store/cartSlice.js';
import PlotModal from '../../components/PlotModal/PlotModal.jsx';

function Cart() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const [selectedPlot, setSelectedPlot] = useState(null);

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + getShopPrice(item.id),
        0
    );

    return (
        <section className={clsx('page', styles.cartPage)}>
            <div className={styles.heading}>
                <h1>Корзина</h1>

                {cartItems.length > 0 && (
                    <button
                        type="button"
                        className={styles.clearButton}
                        onClick={() => dispatch(clearCart())}
                    >
                        Очистить корзину
                    </button>
                )}
            </div>

            {cartItems.length === 0 ? (
                <p className={styles.emptyMessage}>
                    Ваша корзина пока пуста
                </p>
            ) : (
                <>
                    <div className={styles.grid}>
                        {cartItems.map((item) => (
                            <article
                                key={item.id}
                                className={styles.card}
                            >
                                <button
                                    type="button"
                                    className={styles.cardContent}
                                    onClick={() => setSelectedPlot(item)}
                                >
                                    <img
                                        className={styles.image}
                                        src={getShopImage(
                                            item.imageIndex ?? item.id - 1
                                        )}
                                        alt={`Земельный участок в ${item.city}`}
                                    />

                                    <div className={styles.info}>
                                        <h2>{item.city}</h2>
                                        <p>{item.country}</p>

                                        <p>
                                            Площадь:{' '}
                                            {getShopArea(item.id).toLocaleString(
                                                'ru-RU'
                                            )}{' '}
                                            м²
                                        </p>

                                        <p className={styles.price}>
                                            {getShopPrice(item.id).toLocaleString(
                                                'ru-RU'
                                            )}{' '}
                                            ₽
                                        </p>
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    className={styles.removeButton}
                                    onClick={() =>
                                        dispatch(removeFromCart(item.id))
                                    }
                                >
                                    Удалить из корзины
                                </button>
                            </article>
                        ))}
                    </div>

                    <div className={styles.summary}>
                        <p>
                            Участков: <strong>{cartItems.length}</strong>
                        </p>

                        <p>
                            Общая стоимость:{' '}
                            <strong>
                                {totalPrice.toLocaleString('ru-RU')} ₽
                            </strong>
                        </p>
                    </div>
                </>
            )}

            <PlotModal
                plot={selectedPlot}
                onClose={() => setSelectedPlot(null)}
            />
        </section>
    );
}

export default Cart;
