import clsx from 'clsx';
import styles from './ShopControls.module.scss';
import SortButton from '../sortButton/SortButton.jsx';
import CityFilter from '../сityFilter/CityFilter.jsx';
import MapIcon from '../../../public/icons/map/MapIcon.jsx';

function ShopControls({cities, city, onCityChange, sortBy, onSortChange, showMap, onToggleMap, onClearCart}) {
    return (
        <div className={styles.controls}>
            <div className={styles.mainControls}>
                <SortButton
                    sortBy={sortBy}
                    onSortChange={onSortChange}
                    titleAsc="По возрастанию цены"
                    titleDesc="По убыванию цены"
                    titleOff="Сортировка выключена"
                />

                <CityFilter
                    cities={cities}
                    city={city}
                    onCityChange={onCityChange}
                />

                <button
                    type="button"
                    className={clsx('LimeButton', styles.mapButton)}
                    onClick={onToggleMap}
                    aria-pressed={showMap}
                >
                    <MapIcon />
                    <span>{showMap ? 'Каталог' : 'Карта'}</span>
                </button>
            </div>

            {onClearCart && (
                <button
                    type="button"
                    className={clsx('Button', styles.clearButton)}
                    onClick={onClearCart}
                >
                    Очистить корзину
                </button>
            )}
        </div>
    );
}

export default ShopControls;
