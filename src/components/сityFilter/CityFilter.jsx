import { useState } from 'react';
import FilterIcon from '../../../public/icons/filter/FilterIcon.jsx';
import styles from './CityFilter.module.scss';
import clsx from "clsx";

function CityFilter({ cities, city, onCityChange }) {
    const [isOpen, setIsOpen] = useState(false);

    function selectCity(value) {
        onCityChange(value);
        setIsOpen(false);
    }

    return (
        <div className={styles.cityFilter}>
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
