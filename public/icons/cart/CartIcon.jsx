function CartIcon({ count = 0 }) {
    return (
        <svg
            width="28"
            height="27"
            viewBox="0 0 28 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M15.6004 11.3998V8.39981C15.6004 6.41158 13.9886 4.7998 12.0004 4.7998C10.0122 4.7998 8.40039 6.41158 8.40039 8.3998V11.3998M4.72766 25.1998H19.2731C20.5584 25.1998 21.6004 24.1772 21.6004 22.9158L20.1095 10.7998C20.1095 9.53835 19.0675 8.51576 17.7822 8.51576H5.92766C4.64235 8.51576 3.60039 9.53835 3.60039 10.7998L2.40039 22.9158C2.40039 24.1772 3.44235 25.1998 4.72766 25.1998Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle cx="22" cy="6" r="6" fill="#68D017" />
            {count > 0 && (
                <text
                    x="22"
                    y="6"
                    fill="white"
                    fontSize={count > 99 ? '6' : '8'}
                    fontWeight="700"
                    textAnchor="middle"
                    dominantBaseline="central"
                >
                    {count > 99 ? '99+' : count}
                </text>
            )}
        </svg>
    );
}

export default CartIcon;
