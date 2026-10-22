import styles from "../Shop.module.scss";
import Loader from "../../../components/loader/Loader.jsx";

function ShopLoader() {
    return (
        <div className={styles.loader}>
            <Loader text="Загружаем следующие участки..." />
        </div>
    );
}

export default ShopLoader;
