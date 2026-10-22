import styles from '../Home.module.scss';

function FeatureCard({image, alt, children}) {
    return (
        <article className={styles.featureCard}>
            <img
                className="Image"
                src={image}
                alt={alt}
                loading="lazy"
            />

            <p className={styles.featureDescription}>
                {children}
            </p>
        </article>
    );
}

export default FeatureCard;