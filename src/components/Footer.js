import React from 'react';
//style
import styles from '../styles/Footer.module.css';

const Footer = () => {
    return (
        <div className={styles.Footer}>
            <a href="https://bitpin.ir/" target="_blank" rel="noreferrer">
                <img alt="logo" src="https://bitpin.org/static/media/ic-bitpin-logo.59c2162c.svg"></img>
                <span>بیت‌پین</span>
            </a>
            <p>COPYRIGHT © 2022 DEVELOPED BY <a href="https://mehdirezakhani.ir" target="_blank" rel="noreferrer">MehdiRezakhani</a></p>
            <h5><a href="https://github.com/MehdiiRezakhani/BitPin-Task" target="_blank" rel="noreferrer">View Source</a></h5>
        </div>
    );
};

export default Footer;