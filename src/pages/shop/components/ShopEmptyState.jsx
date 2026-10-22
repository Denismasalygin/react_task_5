import styles from "../Shop.module.scss";

function ShopEmptyState({ hasItems, hasMore }) {
    if (!hasItems) {
        return <p>Участки не найдены.</p>;
    }

    if (!hasMore) {
        return (
            <p className={styles.endMessage}>
                Вы просмотрели все участки.
            </p>
        );
    }

    return null;
}

export default ShopEmptyState;
