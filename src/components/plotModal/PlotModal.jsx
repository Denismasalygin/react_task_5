import {useEffect, useState} from 'react';
import styles from './PlotModal.module.scss';
import {getShopArea, getShopPrice, getShopImage} from '../../pages/shop/utils/shopHelpers.js';
import clsx from 'clsx';
import CartActionButton from '../cartActionButton/CartActionButton.jsx';

function PlotModal({plot, onClose}) {
    const [isVisible, setIsVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [displayPlot, setDisplayPlot] = useState(plot);
    const isModalVisible = isVisible && !isClosing;

    useEffect(() => {
        if (plot) {
            setDisplayPlot(plot);
            setIsClosing(false);
            setIsVisible(false);

            let secondFrame;

            const firstFrame = requestAnimationFrame(() => {
                secondFrame = requestAnimationFrame(() => {
                    setIsVisible(true);
                });
            });

            return () => {
                cancelAnimationFrame(firstFrame);
                if (secondFrame) {
                    cancelAnimationFrame(secondFrame);
                }
            };
        }

        if (displayPlot) {
            setIsVisible(false);
            setIsClosing(true);

            const timeout = setTimeout(() => {
                setDisplayPlot(null);
                setIsClosing(false);
            }, 500);

            return () => clearTimeout(timeout);
        }
    }, [plot]);

    useEffect(() => {
        if (!displayPlot) return;

        function handleKeyDown(event) {
            if (event.key === 'Escape') {
                onClose();
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [displayPlot, onClose]);

    if (!displayPlot) {
        return null;
    }

    return (
        <div
            className={clsx(styles.overlay, {
                [styles.overlayVisible]: isModalVisible,
            })}
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <section
                className={clsx(styles.modal, {
                    [styles.modalVisible]: isModalVisible,
                })}
                role="dialog"
                aria-modal="true"
                aria-labelledby="plot-modal-title"
            >
                <button
                    type="button"
                    className={styles.closeButton}
                    onClick={onClose}
                    aria-label="Закрыть окно"
                >
                    ×
                </button>

                <img
                    className={styles.image}
                    src={getShopImage(
                        displayPlot.imageIndex ?? displayPlot.id - 1
                    )}
                    alt={`Земельный участок в ${displayPlot.city}`}
                />

                <div className={styles.content}>
                    <h2 id="plot-modal-title">
                        Участок — {displayPlot.city}
                    </h2>

                    <p className={styles.location}>
                        {displayPlot.address
                            ? `${displayPlot.address}, `
                            : ''}
                        {displayPlot.city}
                        {displayPlot.country
                            ? `, ${displayPlot.country}`
                            : ''}
                    </p>

                    <dl className={styles.details}>
                        <div>
                            <dt>Площадь</dt>
                            <dd>
                                {getShopArea(displayPlot.id).toLocaleString(
                                    'ru-RU'
                                )}
                                <span>{'м\u00B2'}</span>
                            </dd>
                        </div>

                        <div>
                            <dt>Цена</dt>
                            <dd>
                                {getShopPrice(displayPlot.id).toLocaleString(
                                    'ru-RU'
                                )}
                                <span>{'\u20BD'}</span>
                            </dd>
                        </div>

                        {Number.isFinite(displayPlot.lat) &&
                        Number.isFinite(displayPlot.lng) && (
                            <div>
                                <dt>Координаты</dt>
                                <dd>
                                    {displayPlot.lat}, {displayPlot.lng}
                                </dd>
                            </div>
                        )}
                    </dl>
                    <CartActionButton plot={displayPlot}/>
                </div>
            </section>
        </div>
    );
}

export default PlotModal;
