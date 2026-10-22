import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';

import styles from './CartActionButton.module.scss';
import { addToCart, removeFromCart } from '../../store/cartSlice.js';

function CartActionButton({ plot, onClick }) {
    const dispatch = useDispatch();
    const isInCart = useSelector((state) =>
        state.cart.items.some((item) => item.id === plot.id)
    );

    const handleClick = (event) => {
        event.stopPropagation();

        if (isInCart) {
            dispatch(removeFromCart(plot.id));
        } else {
            dispatch(addToCart(plot));
        }

        onClick?.(event, !isInCart);
    };

    return (
        <button
            type="button"
            className={clsx('Button', styles.cartButton, {
                [styles.inCart]: isInCart,
            })}
            onClick={handleClick}
        >
            {isInCart ? 'Удалить из корзины' : 'В корзину'}
        </button>
    );
}

export default CartActionButton;
