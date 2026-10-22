import {useCallback} from 'react';

import styles from './PlotMap.module.scss';
import Loader from '../loader/Loader.jsx';
import {useYandexMap} from '../../hooks/useYandexMap.js';
import {useLocationMarkers} from '../../hooks/useLocationMarkers.js';
import {getShopMapLocations} from '../../pages/shop/utils/shopSelectors.js';

function PlotMap({items, onMarkerClick}) {
    const locations = getShopMapLocations(items);
    const hasLocations = locations.length > 0;

    const {
        mapElementRef,
        mapRef,
        markersRef,
        mapReady,
        mapError,
    } = useYandexMap(hasLocations);

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
            {!mapReady && !mapError && hasLocations && (
                <Loader text="Загружаем карту..." />
            )}

            {mapError && (
                <p role="alert">{mapError}</p>
            )}

            {!hasLocations && (
                <p>Нет участков с координатами для отображения.</p>
            )}

            <div
                ref={mapElementRef}
                className={styles.map}
                aria-label="Карта участков"
            />
        </div>
    );
}

export default PlotMap;
