import {useEffect, useRef, useState} from 'react';
import { loadYandexMaps } from '../utils/loadYandexMaps.js';


/** Загружает API Яндекс Карт, создаёт карту и коллекцию маркеров, очищает карту при размонтировании */
export function useYandexMap(enabled) {
    const mapElementRef = useRef(null);
    const mapRef = useRef(null);
    const markersRef = useRef(null);

    const [mapReady, setMapReady] = useState(false);
    const [mapError, setMapError] = useState('');

    useEffect(() => {
        if (!enabled || !mapElementRef.current) {
            return;
        }

        let cancelled = false;
        let map = null;

        async function initializeMap() {
            try {
                const ymaps = await loadYandexMaps();

                if (cancelled) {
                    return;
                }

                ymaps.ready(() => {
                    if (cancelled || !mapElementRef.current) {
                        return;
                    }

                    map = new ymaps.Map(mapElementRef.current, {
                        center: [55.751244, 37.618423],
                        zoom: 3,
                        controls: [
                            'zoomControl',
                            'fullscreenControl',
                        ],
                    });

                    const markers = new ymaps.GeoObjectCollection();

                    map.geoObjects.add(markers);

                    mapRef.current = map;
                    markersRef.current = markers;

                    setMapReady(true);
                });
            } catch (err) {
                if (!cancelled) {
                    setMapError(
                        err.message ||
                        'Не удалось инициализировать карту.'
                    );
                }
            }
        }

        initializeMap();

        return () => {
            cancelled = true;

            if (map) {
                map.destroy();
            }

            mapRef.current = null;
            markersRef.current = null;
            setMapReady(false);
        };
    }, [enabled]);

    return {
        mapElementRef,
        mapRef,
        markersRef,
        mapReady,
        mapError,
    };
}
