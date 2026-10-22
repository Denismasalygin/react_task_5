import clsx from "clsx";
import { Link } from "react-router-dom";
import styles from "../Contacts.module.scss";

function LocationCard({ location }) {
    return (
        <article className={styles.locationCard} key={location.id}>
            <img
                className={clsx("Image", styles.locationImage)}
                src="/images/ranch.png"
                alt="Грядки овощей на поле"
                loading="lazy"
            />

            <div className={styles.locationInfo}>
                <div>
                    <h2 className={styles.locationName}>
                        {location.name}
                    </h2>

                    <p className={styles.locationAddress}>
                        {location.address}, {location.city}
                    </p>
                </div>

                <Link
                    to="/shop"
                    className={clsx("Button", styles.locationButton)}
                    aria-label="Перейти в магазин"
                >
                    Магазин
                </Link>
            </div>
        </article>
    );
}

export default LocationCard;
