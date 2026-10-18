import { useMemo, useState } from 'react';
import clsx from 'clsx';
import styles from './Shop.module.scss';
import SortButton from '../../components/SortButton/SortButton.jsx';
import CityFilter from '../../components/CityFilter/CityFilter.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import { useYandexMap } from '../../hooks/useYandexMap';
import { useLocationMarkers } from '../../hooks/useLocationMarkers';
import {
    getShopArea,
    getShopPrice,
    getShopImage,
} from './utils/shopHelpers.js';
import MapIcon from "../../../public/icons/map/MapIcon.jsx";
import {filterAndSortShopItems, getShopMapLocations} from "./utils/shopSelectors";
import {getCities} from "../../utils/getCities";
import {useShopItems} from "./hooks/useShopItems";

function Shop() {
    const {
        items,
        hasMore,
        isFetching,
        isError,
        error,
        retryLoading,
        setObserverTarget,
        total,
    } = useShopItems();

    const [sortBy, setSortBy] = useState(null);
    const [city, setCity] = useState('all');
    const [showMap, setShowMap] = useState(false);

    const cities = getCities(items);

    const filteredItems = useMemo(
        () => filterAndSortShopItems(items, city, sortBy),
        [items, city, sortBy]
    );

    const mapLocations = useMemo(
        () => getShopMapLocations(filteredItems),
        [filteredItems]
    );

    const {
        mapElementRef,
        mapRef,
        markersRef,
        mapReady,
        mapError,
    } = useYandexMap(showMap && mapLocations.length > 0);

    useLocationMarkers({
        locations: mapLocations,
        mapReady: showMap && mapReady,
        mapRef,
        markersRef,
    });

    return (
        <section className="page">
            <div className={styles.controls}>
                <SortButton
                    sortBy={sortBy}
                    onSortChange={() =>
                        setSortBy((current) => {
                            if (current === null) return 'asc';
                            if (current === 'asc') return 'desc';
                            return null;
                        })
                    }
                    titleAsc="По возрастанию цены"
                    titleDesc="По убыванию цены"
                    titleOff="Сортировка выключена"
                />

                <CityFilter
                    cities={cities}
                    city={city}
                    onCityChange={setCity}
                />

                <button
                    type="button"
                    className={clsx("LimeButton", "DmSans", styles.mapButton)}
                    onClick={() => setShowMap((current) => !current)}
                    aria-pressed={showMap}
                >
                   <MapIcon /> <span>{showMap ? 'Каталог' : 'Карта'}</span>
                </button>
            </div>

            {isError && (
                <p role="alert" className={styles.error}>
                    {error?.data?.message ||
                    'Не удалось загрузить участки. Попробуйте ещё раз.'}
                    <button
                        type="button"
                        onClick={retryLoading}
                    >
                        Повторить
                    </button>
                </p>
            )}

            {showMap ? (
                <div className={styles.mapWrapper}>
                    {mapError && <p role="alert">{mapError}</p>}
                    <div
                        className={styles.map}
                        ref={mapElementRef}
                        aria-label="Карта участков"
                    />
                    {!mapReady && !mapError && mapLocations.length > 0 && (
                        <Loader text="Загружаем карту..." />
                    )}
                    {mapLocations.length === 0 && (
                        <p>Нет участков с координатами для отображения.</p>
                    )}
                </div>
            ) : (
                <>
                    <div className={styles.grid}>
                        {filteredItems.map((item) => {
                            const triggerIndex = Math.max(0, items.length - 4);
                            const isTrigger =
                                items.length < total &&
                                item.id === filteredItems[triggerIndex]?.id;

                            return (
                                <article
                                    key={item.id}
                                    className={clsx("DmSans", styles.card)}
                                    ref={isTrigger ? setObserverTarget : undefined}
                                >
                                    <img
                                        className={styles.image}
                                        src={getShopImage(item.imageIndex)}
                                        alt={`Земельный участок в ${item.city}`}
                                        loading="lazy"
                                    />

                                    <div className={styles.info}>
                                        <p className={styles.city}>
                                            {item.city}
                                        </p>
                                        <p className={styles.country}>
                                            {item.country}
                                        </p>
                                        <p className={styles.square}>
                                            <span>Площадь:</span>
                                            <span className={styles.infoValue}>
                                                {getShopArea(item.id).toLocaleString('ru-RU')}
                                            </span>
                                            <span className={styles.infoValue}>м²</span>
                                        </p>
                                        <p className={styles.price}>
                                            <span>Площадь:</span>
                                            <span className={styles.infoValue}>
                                                {getShopPrice(item.id).toLocaleString('ru-RU')}
                                            </span>
                                            <span className={styles.infoValue}>₽</span>
                                        </p>
                                        <button
                                            className={clsx("Button", "DmSans", styles.cartButton)}
                                            aria-label="Добавить в корзину"
                                        >
                                            В корзину
                                        </button>
                                    </div>
                                </article>
                            );
                        })}
                    </div>

                    {isFetching && (
                        <div className={styles.loader}>
                            <Loader text="Загружаем следующие участки..." />
                        </div>
                    )}

                    {!isFetching && !isError && items.length === 0 && (
                        <p>Участки не найдены.</p>
                    )}

                    {!hasMore && items.length > 0 && (
                        <p className={styles.endMessage}>
                            Вы просмотрели все участки.
                        </p>
                    )}
                </>
            )}
        </section>
    );
}

export default Shop;
