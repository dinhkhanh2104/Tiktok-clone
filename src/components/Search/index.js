import HeadlessTippy from "@tippyjs/react/headless";
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { faSpinner, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { SearchIcon } from '~/components/Icons';
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDebounce } from '~/hooks';

import * as searchService from "~/services/searchService";

import classNames from "classnames/bind";
import styles from "./Search.module.scss"

const cx = classNames.bind(styles)

function Search() {
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [visible, setVisible] = useState(true)
    const [loading, setLoading] = useState(false)

    const inputRef = useRef();
    const debounced = useDebounce(searchValue, 500)

    const handleClear = () => {
        setSearchValue('')
        setSearchResult([])
        inputRef.current.focus()
    }

    const handleHideResult = () => {
        setVisible(false)
    }

    const handleChange = (e) => {
        const searchValue = e.target.value
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue)
        }
    }


    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([])
            return
        }

        const fetchApi = async () => {
            setLoading(true)

            const result = await searchService.search(debounced)
            setSearchResult(result)

            setLoading(false)
        }

        fetchApi()

    }, [debounced]);

    return (
        <div>
            <HeadlessTippy
                render={attrs => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <div className={cx('search-title')}>
                                {searchResult.map((result) => {
                                    return <AccountItem data={result} key={result.id} />
                                })}
                            </div>
                        </PopperWrapper>
                    </div>
                )}
                visible={searchResult.length > 0 && visible}
                onClickOutside={handleHideResult}
                interactive={true}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder='Search accounts and videos'
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => { setVisible(true) }}
                    />

                    {!!searchValue && !loading && (
                        <button
                            className={cx('clear')}
                            onClick={handleClear}
                        >
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}

                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                    <span className={cx('line')}></span>

                    <button className={cx('search-btn')}
                        onClick={() => {
                            setVisible(true)
                        }}
                    >
                        <SearchIcon />

                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;