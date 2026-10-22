import styles from "../Shop.module.scss";

function ShopError({ error, onRetry }) {
    return (
        <p role="alert" className={styles.error}>
            {error?.data?.message ||
                "Не удалось загрузить участки. Попробуйте ещё раз."}
            <button type="button" onClick={onRetry}>
                Повторить
            </button>
        </p>
    );
}

export default ShopError;
