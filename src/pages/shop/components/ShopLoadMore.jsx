import clsx from "clsx";
import styles from "../Shop.module.scss";

function ShopLoadMore({ onLoadMore }) {
    return (
        <div className={styles.loadMore}>
            <button
                type="button"
                className={clsx("LimeButton", styles.loadMoreButton)}
                onClick={onLoadMore}
            >
                Загрузить ещё
            </button>
        </div>
    );
}

export default ShopLoadMore;
