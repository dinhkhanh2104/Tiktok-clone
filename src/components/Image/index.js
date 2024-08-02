import PropTypes from 'prop-types'
import classNames from "classnames";
import { forwardRef } from "react";
import images from "~/assets/images";
import { useState } from "react";
import styles from './Image.module.scss'


const Image = forwardRef(({ src, alt, className, fallback: customeFallback = images.defaultAvatar, ...props }, ref) => {

    const [fallBack, setFallback] = useState('')
    const handleError = () => {
        setFallback(customeFallback)
    }

    return (
        <img
            ref={ref}
            className={classNames(className, styles.wrapper)}
            src={fallBack || src}
            alt={alt}
            {...props}
            onError={handleError}
        />
    );
})

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    fallback: PropTypes.string,
}

export default Image;