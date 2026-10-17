import {useEffect} from 'react';

/** Удаляет старые маркеры, добавляет новые и подстраивает масштаб карты под найденные локации */
export function useLocationMarkers({locations, mapReady, mapRef, markersRef}) {
    useEffect(() => {
        if (!mapReady || !markersRef.current || !window.ymaps) {
            return;
        }

        const markers = markersRef.current;

        markers.removeAll();

        locations.forEach((location) => {
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
    }, [locations, mapReady, mapRef, markersRef]);
}
