import clsx from 'clsx';
import styles from './Tooltip.module.scss';

function Tooltip({ text, children }) {
    return (
        <span className={clsx(styles.tooltip)} data-tooltip={text}>
            {children}
        </span>
    );
}

export default Tooltip;
