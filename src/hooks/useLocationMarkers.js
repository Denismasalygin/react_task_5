import { useEffect } from 'react';

/** Создаёт маркеры участков, обрабатывает клики и подстраивает масштаб карты */
export function useLocationMarkers({locations, mapReady, mapRef, markersRef, onMarkerClick}) {
    useEffect(() => {
        if (!mapReady || !markersRef.current || !window.ymaps) {
            return;
        }

        const markers = markersRef.current;
        const markerHandlers = [];

        markers.removeAll();

        locations.forEach((location) => {
            const marker = new window.ymaps.Placemark(
                [location.lat, location.lng],
                {
                    balloonContentHeader: location.name,
                    balloonContentBody: [
                        location.address,
                        location.city,
                        location.country,
                    ]
                        .filter(Boolean)
                        .join(', '),
                    hintContent: location.name,
                },
                {
                    preset: 'islands#greenDotIcon',
                }
            );

            const handleClick = () => {
                onMarkerClick?.(location);
            };

            marker.events.add('click', handleClick);
            markerHandlers.push({ marker, handleClick });

            markers.add(marker);
        });

        if (markers.getLength() > 0 && mapRef.current) {
            mapRef.current.setBounds(markers.getBounds(), {
                checkZoomRange: true,
                zoomMargin: 40,
            });
        }

        return () => {
            markerHandlers.forEach(({ marker, handleClick }) => {
                marker.events.remove('click', handleClick);
            });
        };
    }, [locations, mapReady, mapRef, markersRef, onMarkerClick]);
}
