import styles from '../Home.module.scss';
import FeatureCard from './FeatureCard.jsx';

function HomeFeatures() {
    return (
        <section className={styles.features}>
            <FeatureCard
                image="/react_task_5/images/vegetables.jpg"
                alt="Овощи на грядке"
            >
                Арендуйте собственный участок земли
                и наблюдайте, как растут ваши овощи
            </FeatureCard>

            <FeatureCard
                image="/react_task_5/images/tomato.jpg"
                alt="Спелые красные помидоры"
            >
                Наслаждайтесь чудесами природы из года в год на арендованном
                участке для выращивания овощей (60 или 30 м²)
            </FeatureCard>

            <FeatureCard
                image="/react_task_5/images/sprout.jpg"
                alt="Молодой росток растения"
            >
                Выращивайте урожай на собственном участке: от посадки семян
                в плодородную почву до сбора выращенных вами овощей.
            </FeatureCard>
        </section>
    );
}

export default HomeFeatures;
