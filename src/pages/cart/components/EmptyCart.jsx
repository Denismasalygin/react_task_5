import styles from '../Cart.module.scss';

function EmptyCart() {
    return (
        <h1 className={styles.emptyMessage}>
            Ваша корзина пока пуста
        </h1>
    );
}

export default EmptyCart;