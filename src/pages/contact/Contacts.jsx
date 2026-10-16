import {useEffect, useMemo, useRef, useState} from 'react';
import styles from './Contacts.module.scss';
import clsx from "clsx";
import SearchIcon from "../../../public/icons/search/SearchIcon.jsx";
import FilterIcon from "../../../public/icons/filter/FilterIcon.jsx";
import AscSortIcon from "../../../public/icons/ascSort/AscSortIcon.jsx";
import DescSortIcon from "../../../public/icons/descSort/DescSortIcon.jsx";

// Замени значение на свой ключ из кабинета Яндекс Карт.
const YANDEX_MAPS_API_KEY = '928aea94-4241-4e8d-a939-36b89694e208';

function loadYandexMaps() {
    return new Promise((resolve, reject) => {
        if (window.ymaps) {
            resolve(window.ymaps);
            return;
        }

        const script = document.createElement('script');
        script.src = `https://api-maps.yandex.ru/2.1/?apikey=${YANDEX_MAPS_API_KEY}&lang=ru_RU`;
        script.async = true;

        script.onload = () => {
            if (window.ymaps) {
                resolve(window.ymaps);
            } else {
                reject(new Error('Не удалось загрузить Яндекс Карты.'));
            }
        };

        script.onerror = () => {
            reject(new Error('Ошибка загрузки Яндекс Карт.'));
        };

        document.head.appendChild(script);
    });
}

function Contacts() {
    const [locations, setLocations] = useState([]);
    const [search, setSearch] = useState('');
    const [country, setCountry] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const mapElementRef = useRef(null);
    const mapRef = useRef(null);
    const markersRef = useRef(null);
    const [mapReady, setMapReady] = useState(false);
    const [mapError, setMapError] = useState('');

    const [city, setCity] = useState("all");
    const [isCityFilterOpen, setIsCityFilterOpen] = useState(false);

    const cities = [...new Set(
        locations
            .map((location) => location.city)
            .filter(Boolean)
    )].sort((a, b) => a.localeCompare(b));

    // Получаем тестовые адреса из DummyJSON.
    useEffect(() => {
        async function fetchLocations() {
            try {
                const response = await fetch(
                    'https://dummyjson.com/users?limit=10&select=firstName,lastName,address,company'
                );

                if (!response.ok) {
                    throw new Error('Не удалось загрузить список локаций.');
                }

                const data = await response.json();

                const locationsWithCoordinates = data.users
                    .filter((user) => {
                        const coordinates = user.address?.coordinates;

                        return (
                            Number.isFinite(coordinates?.lat) &&
                            Number.isFinite(coordinates?.lng)
                        );
                    })
                    .map((user) => ({
                        id: user.id,
                        name: user.company?.name || `${user.firstName} ${user.lastName}`,
                        address: user.address.address,
                        city: user.address.city,
                        country: user.address.country,
                        lat: user.address.coordinates.lat,
                        lng: user.address.coordinates.lng,
                    }));

                setLocations(locationsWithCoordinates);
            } catch (err) {
                setError(err.message || 'Произошла ошибка при загрузке локаций.');
            } finally {
                setLoading(false);
            }
        }

        fetchLocations();
    }, []);

    // Создаём карту один раз после загрузки адресов.
    useEffect(() => {
        if (!locations.length || !mapElementRef.current) {
            return undefined;
        }

        let cancelled = false;

        async function initializeMap() {
            try {
                if (YANDEX_MAPS_API_KEY === 'ВСТАВЬ_СЮДА_API_KEY') {
                    throw new Error('Добавь API-ключ Яндекс Карт в Contacts.jsx.');
                }

                const ymaps = await loadYandexMaps();

                if (cancelled) {
                    return;
                }

                ymaps.ready(() => {
                    if (cancelled || !mapElementRef.current) {
                        return;
                    }

                    const map = new ymaps.Map(mapElementRef.current, {
                        center: [55.751244, 37.618423],
                        zoom: 3,
                        controls: ['zoomControl', 'fullscreenControl'],
                    });

                    const markers = new ymaps.GeoObjectCollection();

                    map.geoObjects.add(markers);

                    mapRef.current = map;
                    markersRef.current = markers;
                    setMapReady(true);
                });
            } catch (err) {
                if (!cancelled) {
                    setMapError(err.message || 'Не удалось инициализировать карту.');
                }
            }
        }

        initializeMap();

        return () => {
            cancelled = true;

            if (mapRef.current) {
                mapRef.current.destroy();
                mapRef.current = null;
                markersRef.current = null;
            }
        };
    }, [locations.length]);

    const countries = useMemo(
        () => [...new Set(locations.map((location) => location.country))].sort(),
        [locations]
    );

    const filteredLocations = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();

        return locations
            .filter((location) => {
                const matchesSearch = [
                    location.name,
                    location.address,
                    location.city,
                    location.country,
                ]
                    .join(' ')
                    .toLowerCase()
                    .includes(normalizedSearch);

                const matchesCountry =
                    country === 'all' || location.country === country;

                return matchesSearch && matchesCountry;
            })
            .sort((a, b) => {
                if (sortBy === 'city') {
                    return a.city.localeCompare(b.city, 'ru');
                }

                return a.name.localeCompare(b.name, 'ru');
            });
    }, [locations, search, country, sortBy]);

    // Обновляем маркеры при поиске и изменении фильтра.
    useEffect(() => {
        if (!mapReady || !markersRef.current || !window.ymaps) {
            return;
        }

        const markers = markersRef.current;
        markers.removeAll();

        filteredLocations.forEach((location) => {
            const marker = new window.ymaps.Placemark(
                [location.lat, location.lng],
                {
                    balloonContentHeader: location.name,
                    balloonContentBody: `${location.address}, ${location.city}, ${location.country}`,
                    hintContent: location.name,
                }
            );

            markers.add(marker);
        });

        if (markers.getLength() > 0 && mapRef.current) {
            mapRef.current.setBounds(markers.getBounds(), {
                checkZoomRange: true,
                zoomMargin: 40,
            });
        }
    }, [filteredLocations, mapReady]);

    return (
        <section className="page">
            <section className={clsx("pageIntro", styles.hero)}>
                <h1 className="pageTitle">Локации</h1>

                <div className={styles.searchWrapper}>
                    <SearchIcon/>

                    <input
                        id="location-search"
                        className={clsx("DmSans", styles.searchInput)}
                        type="search"
                        placeholder="Поиск по городам, странам, деревням и другим населенным пунктам"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />

                    <button className={clsx("DmSans", "LimeButton", styles.searchButton)} type="button"  aria-label="Поиск" >
                        Поиск
                    </button>
                </div>
            </section>

            <div className={styles.layout}>
                <aside className={styles.sidebar}>
                    <div className={styles.controls}>

                        <button
                            type="button"
                            className={clsx("Button", styles.sortButton)}
                            onClick={() =>
                                setSortBy(sortBy === "asc" ? "desc" : "asc")
                            }
                            aria-label={
                                sortBy === "asc"
                                    ? "Сортировка по убыванию"
                                    : "Сортировка по возрастанию"
                            }
                            title={
                                sortBy === "asc"
                                    ? "По возрастанию"
                                    : "По убыванию"
                            }
                        >
                            {sortBy === "asc" ? <AscSortIcon/> : <DescSortIcon/>}
                        </button>

                        <div className={styles.cityFilter}>
                            <button
                                className={clsx("DmSans", "Button", styles.filterButton)}
                                type="button"
                                onClick={() => setIsCityFilterOpen((open) => !open)}
                                aria-expanded={isCityFilterOpen}
                                aria-label="Фильтр по городам"
                            >
                                <span>
                                    {city === "all" ? "Фильтр" : city}
                                </span>
                                <FilterIcon/>
                            </button>

                            <div
                                className={clsx(
                                    styles.cityDropdown,
                                    isCityFilterOpen && styles.cityDropdownOpen
                                )}
                                aria-hidden={!isCityFilterOpen}
                                inert={!isCityFilterOpen}
                            >
                                <button
                                    type="button"
                                    className={clsx(
                                        styles.cityOption,
                                        city === "all" && styles.cityOptionActive
                                    )}
                                    onClick={() => {
                                        setCity("all");
                                        setIsCityFilterOpen(false);
                                    }}
                                    aria-label="Все города"
                                >
                                    Все города
                                </button>

                                {cities.map((item) => (
                                    <button
                                        type="button"
                                        key={item}
                                        className={clsx(
                                            styles.cityOption,
                                            city === item && styles.cityOptionActive
                                        )}
                                        onClick={() => {
                                            setCity(item);
                                            setIsCityFilterOpen(false);
                                        }}
                                        aria-label={item}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {loading && <p>Загружаем локации…</p>}
                    {error && <p role="alert">{error}</p>}

                    {!loading && !error && filteredLocations.length === 0 && (
                        <p>По вашему запросу ничего не найдено.</p>
                    )}

                    <div className={styles.locationList}>
                        {filteredLocations.map((location) => (
                            <article className={styles.locationCard} key={location.id}>
                                <img
                                    className={clsx("Image", styles.locationImage)}
                                    src="/images/ranch.png"
                                    alt="Грядки овощей на поле"
                                    loading="lazy"
                                />

                                <div className={styles.locationInfo}>
                                    <div>
                                        <h2 className={clsx("DmSans", styles.locationName)}>
                                            {location.name}
                                        </h2>

                                        <p className={clsx("DmSans", styles.locationAddress)}>
                                            {location.address}, {location.city}
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        className={clsx("Button", "DmSans", styles.locationButton)}
                                        aria-label={`Перейти в магазин`}
                                    >
                                        Магазин
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                </aside>

                <div className={styles.mapColumn}>
                    {mapError && <p role="alert">{mapError}</p>}
                    <div
                        className={styles.map}
                        ref={mapElementRef}
                        aria-label="Карта локаций"
                    />
                    {!mapReady && !mapError && (
                        <p className={styles.mapStatus}>Загружаем карту…</p>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Contacts;