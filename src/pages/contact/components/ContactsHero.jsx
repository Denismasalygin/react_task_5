import clsx from "clsx";
import styles from "../Contacts.module.scss";
import SearchIcon from "../../../../public/icons/search/SearchIcon.jsx";
import Tooltip from "../../../components/tooltip/Tooltip.jsx";

function ContactsHero({ search, setSearch }) {
    return (
        <section className={clsx("pageIntro", styles.hero)}>
            <h1 className="pageTitle">Локации</h1>

            <div className={styles.searchWrapper}>
                <SearchIcon />

                <Tooltip
                    className={styles.searchTooltip}
                    text={search || "Поиск по городам, странам, деревням и другим населенным пунктам"}
                >
                    <input
                        id="location-search"
                        className={styles.searchInput}
                        type="search"
                        placeholder="Поиск по городам, странам, деревням и другим населенным пунктам"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                </Tooltip>

                <button
                    className={clsx("LimeButton", styles.searchButton)}
                    type="button"
                    aria-label="Поиск"
                >
                    Поиск
                </button>
            </div>
        </section>
    );
}

export default ContactsHero;
