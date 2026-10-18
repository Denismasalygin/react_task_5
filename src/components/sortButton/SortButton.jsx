import clsx from 'clsx';
import styles from './SortButton.module.scss';
import AscSortIcon from '../../../public/icons/ascSort/AscSortIcon.jsx';
import DescSortIcon from '../../../public/icons/descSort/DescSortIcon.jsx';
import Tooltip from "../tooltip/Tooltip.jsx";

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
        <Tooltip text={tooltipText}>
            <button
                type="button"
                className={clsx('Button', styles.sortButton, {[styles.active]: isActive})}
                onClick={onSortChange}
                aria-label={ariaLabel}
                aria-pressed={isActive}
            >
                {isDescending ? <DescSortIcon/> : <AscSortIcon/>}
            </button>
        </Tooltip>
    );
}

export default SortButton;
