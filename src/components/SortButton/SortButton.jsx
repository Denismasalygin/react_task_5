import clsx from 'clsx';
import styles from './SortButton.module.scss';

import AscSortIcon from '../../../public/icons/ascSort/AscSortIcon.jsx';
import DescSortIcon from '../../../public/icons/descSort/DescSortIcon.jsx';

function SortButton({
        sortBy,
        onSortChange,
        titleAsc = 'По возрастанию',
        titleDesc = 'По убыванию',
        titleOff = 'Сортировка выключена',
    }) {
    const isAscending = sortBy === 'asc';
    const isDescending = sortBy === 'desc';
    const isActive = isAscending || isDescending;

    const tooltipText = isAscending
        ? titleAsc
        : isDescending
            ? titleDesc
            : titleOff;

    const ariaLabel = isAscending
        ? titleAsc
        : isDescending
            ? titleDesc
            : 'Включить сортировку';

    return (
        <button
            type="button"
            className={clsx(
                'Button',
                styles.sortButton,
                isActive && styles.active
            )}
            onClick={onSortChange}
            aria-label={ariaLabel}
            aria-pressed={isActive}
            data-tooltip={tooltipText}
        >
            {isDescending ? <DescSortIcon /> : <AscSortIcon />}
        </button>
    );
}

export default SortButton;
