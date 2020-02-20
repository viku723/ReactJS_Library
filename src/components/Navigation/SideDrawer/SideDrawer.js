import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxx/Auxx';

const sideDrawer = ( props ) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Aux>
            <Backdrop show={props.open} closeModal={props.closeModal}/>
            <div className={attachedClasses.join(' ')}>
                <div style={{height: '11%'}} >
                    <Logo />
                </div>
                <nav>
                    <NavigationItems
                        isAuthenticated={props.isAuthenticated}
                        isAdmin={props.isAdmin}
                        showManageBooksList={props.showManageBooksList}
                        manageBookShow={props.manageBookShow}
                        hideManageBooksListView={props.hideManageBooksListView}
                        manageBookActiveClass={props.manageBookActiveClass}/>
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;