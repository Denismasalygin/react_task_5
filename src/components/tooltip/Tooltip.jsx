import clsx from 'clsx';
import styles from './Tooltip.module.scss';

function Tooltip({ text, children, className }) {
    return (
        <span className={clsx(styles.tooltip, className)} data-tooltip={text}>
            {children}
        </span>
    );
}

export default Tooltip;
