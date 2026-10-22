import styles from '../Cart.module.scss';

function CartSummary({ cartItems, totalPrice }) {
    return (
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
    );
}

export default CartSummary;