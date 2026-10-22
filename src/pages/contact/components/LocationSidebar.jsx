import styles from "../Contacts.module.scss";
import SortButton from "../../../components/sortButton/SortButton.jsx";
import CityFilter from "../../../components/сityFilter/CityFilter.jsx";
import Loader from "../../../components/loader/Loader.jsx";
import LocationCard from "./LocationCard.jsx";

function LocationSidebar({filteredLocations, cities, city, setCity, sortBy, setSortBy, loading, error}) {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.controls}>
                <SortButton
                    sortBy={sortBy}
                    onSortChange={() =>
                        setSortBy((current) => {
                            if (current === null) return "asc";
                            if (current === "asc") return "desc";
                            return null;
                        })
                    }
                />

                <CityFilter cities={cities} city={city} onCityChange={setCity}/>
            </div>

            {loading && <Loader text="Загружаем локации..." />}
            {error && <p role="alert">{error}</p>}

            {!loading && !error && filteredLocations.length === 0 && (
                <p>По вашему запросу ничего не найдено.</p>
            )}

            <div className={styles.locationList}>
                {filteredLocations.map((location) => (
                    <LocationCard key={location.id} location={location}/>
                ))}
            </div>
        </aside>
    );
}

export default LocationSidebar;
