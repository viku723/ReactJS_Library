import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => {
    return(
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.drawerToggleClicked} />
            <div style={{height: '80%'}} >
                <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems
                    isAdmin={props.isAdmin}
                    manageBookShow={props.manageBookShow}
                    showManageBooksList={props.showManageBooksList}
                    isAuthenticated={props.isAuthenticated}
                    hideManageBooksListView={props.hideManageBooksListView}
                    manageBookActiveClass={props.manageBookActiveClass} />
            </nav>
        </header>
    )
}

export default toolbar;