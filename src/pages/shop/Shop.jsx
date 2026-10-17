import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';

import styles from './Shop.module.scss';

import SortButton from '../../components/SortButton/SortButton.jsx';
import CityFilter from '../../components/CityFilter/CityFilter.jsx';
import Loader from '../../components/Loader/Loader.jsx';

import { useLazyGetShopUsersQuery } from '../contact/api/locationsApi.js';
import { useYandexMap } from '../contact/hooks/useYandexMap';
import { useLocationMarkers } from '../contact/hooks/useLocationMarkers';

import {
    getShopArea,
    getShopPrice,
    getShopImage,
} from './utils/shopHelpers.js';
import MapIcon from "../../../public/icons/map/MapIcon.jsx";
import {Link} from "react-router-dom";

const PAGE_SIZE = 10;

function Shop() {
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [sortBy, setSortBy] = useState('asc');
    const [city, setCity] = useState('all');
    const [showMap, setShowMap] = useState(false);
    const [observerTarget, setObserverTarget] = useState(null);

    const inFlightRef = useRef(false);
    const totalRef = useRef(0);

    const [
        fetchShopUsers,
        { isFetching, isError, error },
    ] = useLazyGetShopUsersQuery();

    const loadPage = useCallback(async (skip) => {
        if (inFlightRef.current || (skip > 0 && skip >= totalRef.current)) {
            return;
        }

        inFlightRef.current = true;

        try {
            const result = await fetchShopUsers({
                skip,
                limit: PAGE_SIZE,
            }).unwrap();

            totalRef.current = result.total;
            setTotal(result.total);

            setItems((current) => {
                const existingIds = new Set(current.map((item) => item.id));

                const nextItems = result.users
                    .filter((item) => !existingIds.has(item.id))
                    .map((item, index) => ({
                        ...item,
                        imageIndex: skip + index,
                    }));

                return skip === 0 ? nextItems : [...current, ...nextItems];
            });
        } catch (err) {
            console.error('Не удалось загрузить участки:', err);
        } finally {
            inFlightRef.current = false;
        }
    }, [fetchShopUsers]);

    useEffect(() => {
        loadPage(0);
    }, [loadPage]);

    const hasMore = items.length < total;

    useEffect(() => {
        if (!observerTarget || !hasMore || isFetching) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadPage(items.length);
                }
            },
            {
                rootMargin: '200px',
                threshold: 0.1,
            }
        );

        observer.observe(observerTarget);

        return () => observer.disconnect();
    }, [observerTarget, hasMore, isFetching, items.length, loadPage]);

    const cities = useMemo(
        () => [...new Set(items.map((item) => item.city))].sort(),
        [items]
    );

    const filteredItems = useMemo(() => {
        const result = items.filter(
            (item) => city === 'all' || item.city === city
        );

        return result.sort((a, b) => {
            const priceA = getShopPrice(a.id);
            const priceB = getShopPrice(b.id);

            return sortBy === 'asc'
                ? priceA - priceB
                : priceB - priceA;
        });
    }, [items, city, sortBy]);

    const mapLocations = useMemo(
        () => filteredItems
            .filter(
                (item) =>
                    Number.isFinite(item.lat) &&
                    Number.isFinite(item.lng)
            )
            .map((item) => ({
                ...item,
                name: `Участок — ${item.city}`,
            })),
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
                        setSortBy((current) =>
                            current === 'asc' ? 'desc' : 'asc'
                        )
                    }
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
                        onClick={() => loadPage(items.length)}
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
