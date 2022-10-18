import React from 'react';
//style
import styles from '../styles/Header.module.css'

const Header = () => {
    return (
        <div className={styles.Header}>
            <a href="https://bitpin.ir/" target="_blank" rel="noreferrer">
                <img alt="logo" src="https://bitpin.org/static/media/ic-bitpin-logo.59c2162c.svg"></img>
                <span>بیت‌پین</span>
            </a>
        </div>
    )
}
export default Header;