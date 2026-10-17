import {useEffect, useMemo, useState} from 'react';
import styles from './Contacts.module.scss';
import clsx from "clsx";
import SearchIcon from "../../../public/icons/search/SearchIcon.jsx";
import FilterIcon from "../../../public/icons/filter/FilterIcon.jsx";
import AscSortIcon from "../../../public/icons/ascSort/AscSortIcon.jsx";
import DescSortIcon from "../../../public/icons/descSort/DescSortIcon.jsx";
import {fetchLocations} from "./api/locationsApi";
import {useYandexMap} from "./hooks/useYandexMap";
import {filterLocations} from "./utils/filterLocations";
import {getCities} from "./utils/getCities";
import {useLocationMarkers} from "./hooks/useLocationMarkers";
import Loader from "../../components/Loader/Loader.jsx";

function Contacts() {
    const [locations, setLocations] = useState([]);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('asc');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [city, setCity] = useState("all");
    const [isCityFilterOpen, setIsCityFilterOpen] = useState(false);

    const {
        mapElementRef,
        mapRef,
        markersRef,
        mapReady,
        mapError,
    } = useYandexMap(locations.length > 0);

    const cities = getCities(locations);

    /** Получаем тестовые адреса из DummyJSON */
    useEffect(() => {
        async function loadLocations() {
            try {
                const locations = await fetchLocations();
                setLocations(locations);
            } catch (err) {
                setError(
                    err.message || 'Произошла ошибка при загрузке локаций.'
                );
            } finally {
                setLoading(false);
            }
        }

        loadLocations();
    }, []);

    const filteredLocations = useMemo(
        () => filterLocations(locations, search, city, sortBy),
        [locations, search, city, sortBy]
    );

    useLocationMarkers({
        locations: filteredLocations,
        mapReady,
        mapRef,
        markersRef,
    });

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
                                setSortBy((current) => current === 'asc' ? 'desc' : 'asc')
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

                    {loading && <Loader text="Загружаем локации..." />}
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
                        <Loader text="Загружаем карту..." />
                    )}
                </div>
            </div>
        </section>
    );
}

export default Contacts;
