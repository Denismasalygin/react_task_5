import { useMemo, useState } from "react";
import { filterAndSortShopItems } from "./utils/shopSelectors";
import { getCities } from "../../utils/getCities";
import { useShopItems } from "./hooks/useShopItems";
import PlotModal from "../../components/plotModal/PlotModal.jsx";
import ShopControls from "../../components/shopControls/ShopControls.jsx";
import PlotMap from "../../components/plotMap/PlotMap.jsx";
import ShopError from "./components/ShopError.jsx";
import ShopGrid from "./components/ShopGrid.jsx";
import ShopLoader from "./components/ShopLoader.jsx";
import ShopLoadMore from "./components/ShopLoadMore.jsx";
import ShopEmptyState from "./components/ShopEmptyState.jsx";

function Shop() {
    const {
        items,
        hasMore,
        isFetching,
        isError,
        error,
        loadMore,
        retryLoading,
    } = useShopItems();

    const [sortBy, setSortBy] = useState(null);
    const [city, setCity] = useState("all");
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

            {isError && (<ShopError error={error} onRetry={retryLoading}/>)}

            {showMap ? (
                <PlotMap items={filteredItems} onMarkerClick={setSelectedPlot}/>
            ) : (
                <>
                    <ShopGrid items={filteredItems} onSelect={setSelectedPlot}/>

                    {isFetching && <ShopLoader />}

                    {!isFetching && !isError && items.length === 0 && (
                        <ShopEmptyState hasItems={false} hasMore={hasMore}/>
                    )}

                    {!isFetching &&
                        !isError &&
                        hasMore && (
                            <ShopLoadMore onLoadMore={loadMore} />
                        )}

                    {!hasMore &&
                        !isFetching &&
                        !isError &&
                        items.length > 0 && (
                            <ShopEmptyState hasItems={true} hasMore={hasMore}/>
                        )}
                </>
            )}

            <PlotModal
                plot={selectedPlot}
                onClose={() => setSelectedPlot(null)}
            />
        </section>
    );
}

export default Shop;
