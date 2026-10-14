import {Link} from 'react-router-dom';
import styles from './Home.module.scss';

function Home() {
    return (
        <div className={styles.home}>
            <section className={styles.hero}>
                <h1 className={styles.heroTitle}>
                    Арендуйте собственное поле, инвестируйте
                    в сельское хозяйство и выращивайте
                    собственные овощи
                </h1>

                <Link to="/shop" className={styles.startButton}>
                    Старт
                </Link>
            </section>

            <section className={styles.features}>

                <article className={styles.featureCard}>
                    <img
                        className={styles.featureImage}
                        src="/images/vegetables.jpg"
                        alt="Овощи на грядке"
                        loading="lazy"
                    />

                    <p className={styles.featureDescription}>
                        Арендуйте собственный участок земли
                        и наблюдайте, как растут ваши овощи
                    </p>
                </article>

                <article className={styles.featureCard}>
                    <img
                        className={styles.featureImage}
                        src="/images/tomato.jpg"
                        alt="Спелые красные помидоры"
                        loading="lazy"
                    />

                    <p className={styles.featureDescription}>
                        Наслаждайтесь чудесами природы из года в год на арендованном
                        участке для выращивания овощей (60 или 30 м²)
                    </p>
                </article>

                <article className={styles.featureCard}>
                    <img
                        className={styles.featureImage}
                        src="/images/sprout.jpg"
                        alt="Молодой росток растения"
                        loading="lazy"
                    />

                    <p className={styles.featureDescription}>
                        Выращивайте урожай на собственном участке: от посадки семян
                        в плодородную почву до сбора выращенных вами овощей.
                    </p>
                </article>

            </section>
        </div>
    );
}

export default Home;
