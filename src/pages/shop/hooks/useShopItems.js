import { useCallback, useEffect, useRef, useState } from 'react';
import { useLazyGetShopUsersQuery } from '../../../api/locationsApi.js';

const PAGE_SIZE = 12;

export function useShopItems() {
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);

    const totalRef = useRef(0);

    const [
        fetchShopUsers,
        { isFetching, isError, error },
    ] = useLazyGetShopUsersQuery();

    const loadPage = useCallback(async (skip) => {
        if (skip > 0 && skip >= totalRef.current) return;

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
        }
    }, [fetchShopUsers]);

    useEffect(() => {
        loadPage(0);
    }, [loadPage]);

    const hasMore = items.length < total;

    const loadMore = useCallback(() => {
        if (!isFetching && hasMore) {
            loadPage(items.length);
        }
    }, [isFetching, hasMore, items.length, loadPage]);

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
        loadMore,
        retryLoading,
    };
}
