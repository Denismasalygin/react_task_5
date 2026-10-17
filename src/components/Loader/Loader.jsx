import styles from './Loader.module.scss';

function Loader({ text = 'Загрузка...' }) {
    return (
        <div className={styles.loader} role="status">
            <span className={styles.spinner} aria-hidden="true" />
            <span>{text}</span>
        </div>
    );
}

export default Loader;
