import {useMemo, useState} from 'react';
import styles from './Contacts.module.scss';
import clsx from "clsx";
import SearchIcon from "../../../public/icons/search/SearchIcon.jsx";
import { useGetLocationsQuery } from '../../api/locationsApi.js';
import {useYandexMap} from "../../hooks/useYandexMap";
import {filterLocations} from "./utils/filterLocations";
import {getCities} from "../../utils/getCities";
import {useLocationMarkers} from "../../hooks/useLocationMarkers";
import Loader from "../../components/Loader/Loader.jsx";
import {Link} from "react-router-dom";
import SortButton from "../../components/SortButton/SortButton.jsx";
import CityFilter from "../../components/CityFilter/CityFilter.jsx";

function Contacts() {
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState(null);
    const [city, setCity] = useState('all');
    const {
        data: locations = [],
        isLoading: loading,
        error: queryError,
    } = useGetLocationsQuery();

    const error = queryError
        ? queryError.data?.message ||
        queryError.error ||
        'Не удалось загрузить список локаций.'
        : '';

    const {
        mapElementRef,
        mapRef,
        markersRef,
        mapReady,
        mapError,
    } = useYandexMap(locations.length > 0);

    const cities = getCities(locations);

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
                        <SortButton
                            sortBy={sortBy}
                            onSortChange={() =>
                                setSortBy((current) => {
                                    if (current === null) return 'asc';
                                    if (current === 'asc') return 'desc';
                                    return null;
                                })
                            }
                        />

                        <CityFilter
                            cities={cities}
                            city={city}
                            onCityChange={setCity}
                        />
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

                                    <Link
                                        to="/shop"
                                        className={clsx("Button", "DmSans", styles.locationButton)}
                                        aria-label="Перейти в магазин"
                                    >
                                        Магазин
                                    </Link>
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
