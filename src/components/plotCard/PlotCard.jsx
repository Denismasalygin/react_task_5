import styles from './PlotCard.module.scss';
import {getShopArea, getShopPrice, getShopImage,} from '../../pages/shop/utils/shopHelpers.js';
import CartActionButton from '../cartActionButton/CartActionButton.jsx';

function PlotCard({ plot, onSelect, observerRef }) {
    return (
        <article
            className={styles.card}
            ref={observerRef}
        >
            <button
                type="button"
                className={styles.cardContent}
                onClick={() => onSelect?.(plot)}
                aria-label={`Подробнее об участке в ${plot.city}`}
            >
                <img
                    className={styles.image}
                    src={getShopImage(
                        plot.imageIndex ?? plot.id - 1
                    )}
                    alt={`Земельный участок в ${plot.city}`}
                    loading="lazy"
                />

                <div className={styles.info}>
                    <p className={styles.city}>{plot.city}</p>
                    <p className={styles.country}>{plot.country}</p>

                    <p className={styles.detail}>
                        <span>Площадь:</span>
                        <span className={styles.infoValue}>
                            {getShopArea(plot.id).toLocaleString('ru-RU')} м²
                        </span>
                    </p>

                    <p className={styles.detail}>
                        <span>Цена:</span>
                        <span className={styles.infoValue}>
                            {getShopPrice(plot.id).toLocaleString('ru-RU')} ₽
                        </span>
                    </p>
                </div>
            </button>

            <div className={styles.actions}>
                <CartActionButton plot={plot}/>
            </div>
        </article>
    );
}

export default PlotCard;
