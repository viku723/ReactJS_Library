import React from 'react';
import logoSrc from '../../assets/images/library.jpg';
import classes from './Logo.css';

const logo = (props) => {
    return(
        <div className={classes.Logo}>
            <img src={logoSrc} alt="logo" />
        </div>
    )
}

export default logo;