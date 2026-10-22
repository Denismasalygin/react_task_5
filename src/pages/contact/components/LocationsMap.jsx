import styles from "../Contacts.module.scss";
import Loader from "../../../components/loader/Loader.jsx";

function LocationsMap({ mapElementRef, mapReady, mapError }) {
    return (
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
    );
}

export default LocationsMap;
