export function loadYandexMaps() {
    return new Promise((resolve, reject) => {
        if (window.ymaps) {
            resolve(window.ymaps);
            return;
        }

        const script = document.createElement('script');
        script.src = `https://api-maps.yandex.ru/2.1/?apikey=928aea94-4241-4e8d-a939-36b89694e208&lang=ru_RU`;
        script.async = true;

        script.onload = () => {
            if (window.ymaps) {
                resolve(window.ymaps);
            } else {
                reject(new Error('Не удалось загрузить Яндекс Карты.'));
            }
        };

        script.onerror = () => {
            reject(new Error('Ошибка загрузки Яндекс Карт.'));
        };

        document.head.appendChild(script);
    });
}
