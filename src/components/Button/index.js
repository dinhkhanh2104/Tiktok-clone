import PropTypes from 'prop-types'
import styles from "./Button.module.scss"
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles)

function Button({
    children,
    to,
    href,
    onClick,
    primary = false,
    outline = false,
    small = false,
    large = false,
    text = false,
    disable = false,
    rounded = false,
    className = false,
    leftIcon = false,
    rightIcon = false,
}) {
    let Comp = 'button'

    const props = {
        onClick,
    }

    if (to) {
        props.to = to;
        Comp = Link
    } else if (href) {
        props.href = href
        Comp = 'a'
    }

    if (disable) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key]
            }
        })
    }

    const classes = cx('wrapper', {
        primary: primary,
        outline: outline,
        small: small,
        large: large,
        text: text,
        disable: disable,
        rounded: rounded,
        [className]: className,
        leftIcon: leftIcon,
        rightIcon: rightIcon,
    })

    return (
        <Comp className={classes} {...props} >
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string,
    href: PropTypes.string,
    onClick: PropTypes.func,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    text: PropTypes.string,
    disable: PropTypes.bool,
    rounded: PropTypes.bool,
    className: PropTypes.string,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
}
export default Button;