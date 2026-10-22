import styles from "../Shop.module.scss";
import PlotCard from "../../../components/plotCard/PlotCard.jsx";

function ShopGrid({ items, onSelect }) {
    return (
        <div className={styles.grid}>
            {items.map((item) => (
                <PlotCard key={item.id} plot={item} onSelect={onSelect}/>
            ))}
        </div>
    );
}

export default ShopGrid;
