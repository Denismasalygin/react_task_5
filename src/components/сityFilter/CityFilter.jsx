import { useState, useEffect, useRef } from 'react';
import FilterIcon from '../../../public/icons/filter/FilterIcon.jsx';
import styles from './CityFilter.module.scss';
import clsx from "clsx";

function CityFilter({ cities, city, onCityChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const filterRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;

        function handleClickOutside(event) {
            if (
                filterRef.current &&
                !filterRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }

        function handleKeyDown(event) {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        }

        document.addEventListener('pointerdown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('pointerdown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    function selectCity(value) {
        onCityChange(value);
        setIsOpen(false);
    }

    return (
        <div className={styles.cityFilter} ref={filterRef}>
            <button
                type="button"
                className={clsx("Button", styles.filterButton)}
                onClick={() => setIsOpen((open) => !open)}
                aria-expanded={isOpen}
                aria-label="Фильтр по городам"
            >
                <span>{city === 'all' ? 'Фильтр' : city}</span>
                <FilterIcon />
            </button>

            <div
                className={clsx(
                    styles.cityDropdown,
                    isOpen && styles.cityDropdownOpen
                )}
                aria-hidden={!isOpen}
                inert={!isOpen}
            >
                <button
                    type="button"
                    className={clsx(
                        styles.cityOption,
                        city === 'all' && styles.cityOptionActive
                    )}
                    onClick={() => selectCity('all')}
                >
                    Все города
                </button>

                {cities.map((item) => (
                    <button
                        type="button"
                        key={item}
                        className={clsx(
                            styles.cityOption,
                            city === item && styles.cityOptionActive
                        )}
                        onClick={() => selectCity(item)}
                    >
                        {item}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default CityFilter;
