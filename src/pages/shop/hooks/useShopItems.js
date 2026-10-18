import { useCallback, useEffect, useRef, useState } from 'react';
import { useLazyGetShopUsersQuery } from '../../../api/locationsApi.js';

const PAGE_SIZE = 10;

export function useShopItems() {
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [observerTarget, setObserverTarget] = useState(null);

    const inFlightRef = useRef(false);
    const totalRef = useRef(0);

    const [
        fetchShopUsers,
        { isFetching, isError, error },
    ] = useLazyGetShopUsersQuery();

    const loadPage = useCallback(async (skip) => {
        if (inFlightRef.current || (skip > 0 && skip >= totalRef.current)) {
            return;
        }

        inFlightRef.current = true;

        try {
            const result = await fetchShopUsers(
                { skip, limit: PAGE_SIZE },
                true
            ).unwrap();

            totalRef.current = result.total;
            setTotal(result.total);

            const nextItems = result.users.map((item, index) => ({
                ...item,
                imageIndex: skip + index,
            }));

            if (skip === 0) {
                setItems(nextItems);
            } else {
                setItems((current) => {
                    const existingIds = new Set(
                        current.map((item) => item.id)
                    );

                    const uniqueItems = nextItems.filter(
                        (item) => !existingIds.has(item.id)
                    );

                    return [...current, ...uniqueItems];
                });
            }
        } catch (err) {
            console.error('Не удалось загрузить участки:', err);
        } finally {
            inFlightRef.current = false;
        }
    }, [fetchShopUsers]);

    useEffect(() => {
        loadPage(0);
    }, [loadPage]);

    const hasMore = items.length < total;

    useEffect(() => {
        if (!observerTarget || !hasMore || isFetching) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadPage(items.length);
                }
            },
            {
                rootMargin: '200px',
                threshold: 0.1,
            }
        );

        observer.observe(observerTarget);

        return () => observer.disconnect();
    }, [
        observerTarget,
        hasMore,
        isFetching,
        items.length,
        loadPage,
    ]);

    const retryLoading = useCallback(() => {
        loadPage(items.length === 0 ? 0 : items.length);
    }, [items.length, loadPage]);

    return {
        items,
        total,
        hasMore,
        isFetching,
        isError,
        error,
        loadPage,
        retryLoading,
        observerTarget,
        setObserverTarget,
    };
}
