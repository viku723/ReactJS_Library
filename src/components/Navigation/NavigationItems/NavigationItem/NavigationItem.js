import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.css';

const navigationItem = (props) => {
    return(
        <li className={classes.NavigationItem} onClick={props.hideManageBooksListView}>
            <NavLink
                to={props.link}
                activeClassName={classes.active}>
                {props.name}
            </NavLink>
        </li>
    )
}

export default navigationItem;