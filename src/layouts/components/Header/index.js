import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn, faEllipsisVertical, faEarthAsia, faCircleQuestion, faKeyboard, faUser, faCoins, faSignOut, faGear } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss'
import 'tippy.js/dist/tippy.css';

import config from '~/config'
import Menu from '~/components/Popper/Menu';
import images from '~/assets/images'
import Button from '~/components/Button';
import { UploadIcon, MessageIcon, InboxIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Search from '~/components/Search';

const cx = classNames.bind(styles)

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'language',
                    code: 'zh',
                    title: '中文',
                },
                {
                    type: 'language',
                    code: 'es',
                    title: 'Español',
                },
                {
                    type: 'language',
                    code: 'ar',
                    title: 'العربية',
                },
                {
                    type: 'language',
                    code: 'hi',
                    title: 'हिन्दी',
                },
                {
                    type: 'language',
                    code: 'ru',
                    title: 'Русский',
                },
                {
                    type: 'language',
                    code: 'pt',
                    title: 'Português',
                },
                {
                    type: 'language',
                    code: 'fr',
                    title: 'Français',
                },
                {
                    type: 'language',
                    code: 'de',
                    title: 'Deutsch',
                },
                {
                    type: 'language',
                    code: 'ja',
                    title: '日本語',
                },
                {
                    type: 'language',
                    code: 'it',
                    title: 'Italiano',
                },
                {
                    type: 'language',
                    code: 'ko',
                    title: '한국어',
                },
                {
                    type: 'language',
                    code: 'pl',
                    title: 'Polski',
                },
                {
                    type: 'language',
                    code: 'tr',
                    title: 'Türkçe',
                },
                {
                    type: 'language',
                    code: 'nl',
                    title: 'Nederlands',
                },
                {
                    type: 'language',
                    code: 'sv',
                    title: 'Svenska',
                },
                {
                    type: 'language',
                    code: 'no',
                    title: 'Norsk',
                },
                {
                    type: 'language',
                    code: 'da',
                    title: 'Dansk',
                },
                {
                    type: 'language',
                    code: 'fi',
                    title: 'Suomi',
                },
                {
                    type: 'language',
                    code: 'el',
                    title: 'Ελληνικά',
                },
                {
                    type: 'language',
                    code: 'cs',
                    title: 'Čeština',
                }
            ]
        }
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
]

const MENU_USER = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'View profile',
        to: '/@khanhh',
    },
    {
        icon: <FontAwesomeIcon icon={faCoins} />,
        title: 'Get coins',
        to: '/coin',
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Setting',
        to: '/setting',
    },

    ...MENU_ITEMS,
    {
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Log out',
        to: '/logout',
        separate: true,
    },

]

function Header() {
    const currentUser = true;

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <Link to={config.routes.home} className={cx('logo-link')}>
                        <img src={images.logo.default} alt="tiktok-logo" />
                    </Link>
                </div>

                <Search />

                <div className={cx('actions')}>
                    {
                        currentUser ?
                            (
                                <>
                                    <Tippy
                                        content='Upload video' delay={[0, 50]} placement='bottom' interactive
                                    >
                                        <button className={cx('action-btn')}>
                                            <UploadIcon />
                                        </button>
                                    </Tippy>

                                    <Tippy delay={[0, 50]} content="Message" placement="bottom" interactive>
                                        <button className={cx('action-btn')}>
                                            <MessageIcon />
                                        </button>
                                    </Tippy>

                                    <Tippy delay={[0, 50]} content="Inbox" placement="bottom" interactive>
                                        <button className={cx('action-btn')}>
                                            <InboxIcon />
                                            <span className={cx('badge')}>12</span>
                                        </button>
                                    </Tippy>

                                </>)

                            :

                            (
                                <>
                                    <Button text>Upload</Button >
                                    <Button primary rightIcon={<FontAwesomeIcon icon={faSignIn} />} >Log in</Button >
                                </>
                            )
                    }
                    <Menu
                        items={currentUser ? MENU_USER : MENU_ITEMS}
                    >
                        {currentUser ? (
                            <Image
                                src='https://i.pinimg.com/736x/20/63/1e/20631ea7390a7a5eba653adf731fc9e2.jpg'
                                className={cx('user-avatar')}
                                alt='messiiiii'
                                fallback='https://fullstack.edu.vn/assets/f8-icon-lV2rGpF0.png'
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>

            </div>
        </header>
    );
}

export default Header