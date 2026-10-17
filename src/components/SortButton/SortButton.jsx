import clsx from 'clsx';
import styles from './SortButton.module.scss';

import AscSortIcon from '../../../public/icons/ascSort/AscSortIcon.jsx';
import DescSortIcon from '../../../public/icons/descSort/DescSortIcon.jsx';

function SortButton({ sortBy, onSortChange }) {
    const isAscending = sortBy === 'asc';

    return (
        <button
            type="button"
            className={clsx('Button', styles.sortButton)}
            onClick={onSortChange}
            aria-label={
                isAscending
                    ? 'Сортировка по убыванию'
                    : 'Сортировка по возрастанию'
            }
            title={
                isAscending
                    ? 'По возрастанию'
                    : 'По убыванию'
            }
        >
            {isAscending ? <AscSortIcon /> : <DescSortIcon />}
        </button>
    );
}

export default SortButton;
