import PropTypes from 'prop-types'
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from "./Menu.module.scss"
import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItems from './MenuItems';
import Header from './Header';
import { useState } from 'react';

const cx = classNames.bind(styles)

function Menu({ children, items = [], hideOnClick = false }) {
    const [history, setHistory] = useState([{ data: items }])
    const current = history[history.length - 1]

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children

            return <MenuItems
                key={index}
                data={item}
                onClick={() => {
                    if (isParent)
                        setHistory((prev) => [...prev, item.children])
                }
                }
            />
        }
        )
    }

    return (
        <Tippy
            // visible
            offset={[12, 8]}
            interactive
            placement='bottom-end'
            hideOnClick={hideOnClick}
            delay={[0, 700]}
            onHide={() => { setHistory(prev => prev.slice(0, 1)) }}
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {history.length >= 2 &&
                            <Header title={current.title}
                                onBack={() => { setHistory(prev => prev.slice(0, prev.length - 1)) }}
                            />
                        }
                        <div className={cx('menu-body')}> {renderItems()}</div>
                    </PopperWrapper>
                </div>
            )}
        >
            {children}

        </Tippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
}

export default Menu;