import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from '../Home.module.scss';

function HomeHero() {
    return (
        <section className={clsx('pageIntro', styles.hero)}>
            <h1 className="pageTitle">
                Арендуйте собственное поле, инвестируйте
                в сельское хозяйство и выращивайте
                собственные овощи
            </h1>

            <Link
                to="/shop"
                className={clsx('LimeButton', styles.startButton)}
                aria-label="Перейти в каталог товаров"
            >
                Старт
            </Link>
        </section>
    );
}

export default HomeHero;