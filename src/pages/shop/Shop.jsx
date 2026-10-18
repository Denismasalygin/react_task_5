import {useMemo, useState} from 'react';
import styles from './Shop.module.scss';
import Loader from '../../components/loader/Loader.jsx';
import {filterAndSortShopItems} from "./utils/shopSelectors";
import {getCities} from "../../utils/getCities";
import {useShopItems} from "./hooks/useShopItems";
import PlotModal from "../../components/plotModal/PlotModal.jsx";
import ShopControls from '../../components/shopControls/ShopControls.jsx';
import PlotCard from '../../components/plotCard/PlotCard.jsx';
import PlotMap from '../../components/plotMap/PlotMap.jsx';

function Shop() {
    const {
        items,
        hasMore,
        isFetching,
        isError,
        error,
        retryLoading,
        setObserverTarget,
        total,
    } = useShopItems();

    const [sortBy, setSortBy] = useState(null);
    const [city, setCity] = useState('all');
    const [showMap, setShowMap] = useState(false);
    const [selectedPlot, setSelectedPlot] = useState(null);

    const cities = getCities(items);

    const filteredItems = useMemo(
        () => filterAndSortShopItems(items, city, sortBy),
        [items, city, sortBy]
    );

    return (
        <section className="page">
            <ShopControls
                cities={cities}
                city={city}
                onCityChange={setCity}
                sortBy={sortBy}
                onSortChange={() =>
                    setSortBy((current) => {
                        if (current === null) return 'asc';
                        if (current === 'asc') return 'desc';
                        return null;
                    })
                }
                showMap={showMap}
                onToggleMap={() => setShowMap((current) => !current)}
            />

            {isError && (
                <p role="alert" className={styles.error}>
                    {error?.data?.message ||
                    'Не удалось загрузить участки. Попробуйте ещё раз.'}
                    <button type="button" onClick={retryLoading}>
                        Повторить
                    </button>
                </p>
            )}

            {showMap ? (
                <PlotMap items={filteredItems} onMarkerClick={setSelectedPlot}/>
            ) : (
                <>
                    <div className={styles.grid}>
                        {filteredItems.map((item) => {
                            const triggerIndex = Math.max(0, items.length - 4);
                            const isTrigger =
                                items.length < total &&
                                item.id === filteredItems[triggerIndex]?.id;

                            return (
                                <PlotCard
                                    key={item.id}
                                    plot={item}
                                    onSelect={setSelectedPlot}
                                    observerRef={
                                        isTrigger ? setObserverTarget : undefined
                                    }
                                />
                            );
                        })}
                    </div>

                    {isFetching && (
                        <div className={styles.loader}>
                            <Loader text="Загружаем следующие участки..." />
                        </div>
                    )}

                    {!isFetching && !isError && items.length === 0 && (
                        <p>Участки не найдены.</p>
                    )}

                    {!hasMore && items.length > 0 && (
                        <p className={styles.endMessage}>
                            Вы просмотрели все участки.
                        </p>
                    )}
                </>
            )}
            <PlotModal plot={selectedPlot} onClose={() => setSelectedPlot(null)}/>
        </section>
    );
}

export default Shop;
