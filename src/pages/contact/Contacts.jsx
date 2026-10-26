import { useMemo, useState } from "react";
import styles from "./Contacts.module.scss";
import { useGetLocationsQuery } from "../../api/locationsApi.js";
import { useYandexMap } from "../../hooks/useYandexMap";
import { filterLocations } from "./utils/filterLocations";
import { getCities } from "../../utils/getCities";
import { useLocationMarkers } from "../../hooks/useLocationMarkers";
import ContactsHero from "./components/ContactsHero.jsx";
import LocationSidebar from "./components/LocationSidebar.jsx";
import LocationsMap from "./components/LocationsMap.jsx";

function Contacts() {
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState(null);
    const [city, setCity] = useState("all");

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
            <ContactsHero search={search} setSearch={setSearch}/>

            <div className={styles.layout}>
                <LocationSidebar
                    filteredLocations={filteredLocations}
                    cities={cities}
                    city={city}
                    setCity={setCity}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    loading={loading}
                    error={error}
                />

                <LocationsMap
                    mapElementRef={mapElementRef}
                    mapReady={mapReady}
                    mapError={mapError}
                />
            </div>
        </section>
    );
}

export default Contacts;
