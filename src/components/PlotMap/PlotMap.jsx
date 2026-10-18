import { useCallback } from 'react';

import styles from './PlotMap.module.scss';
import Loader from '../Loader/Loader.jsx';
import { useYandexMap } from '../../hooks/useYandexMap.js';
import { useLocationMarkers } from '../../hooks/useLocationMarkers.js';
import { getShopMapLocations } from '../../pages/shop/utils/shopSelectors.js';

function PlotMap({ items, onMarkerClick }) {
    const locations = getShopMapLocations(items);

    const {
        mapElementRef,
        mapRef,
        markersRef,
        mapReady,
        mapError,
    } = useYandexMap(locations.length > 0);

    const handleMarkerClick = useCallback(
        (location) => onMarkerClick?.(location),
        [onMarkerClick]
    );

    useLocationMarkers({
        locations,
        mapReady,
        mapRef,
        markersRef,
        onMarkerClick: handleMarkerClick,
    });

    return (
        <div className={styles.mapWrapper}>
            {mapError && <p role="alert">{mapError}</p>}

            <div
                ref={mapElementRef}
                className={styles.map}
                aria-label="Карта участков"
            />

            {!mapReady && !mapError && locations.length > 0 && (
                <Loader text="Загружаем карту..." />
            )}

            {locations.length === 0 && (
                <p>Нет участков с координатами для отображения.</p>
            )}
        </div>
    );
}

export default PlotMap;
