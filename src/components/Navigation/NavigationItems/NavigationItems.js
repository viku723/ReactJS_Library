import React from 'react';
import classes from './NavigationItems.css';
import classesNavItem from './NavigationItem/NavigationItem.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Auxx from '../../../hoc/Auxx/Auxx';

const navigation = (props) => {
    let authNav = null;
    if (props.isAuthenticated) {
        authNav = (
            <Auxx>
                <NavigationItem hideManageBooksListView={props.hideManageBooksListView} link='/books'  name='Books'></NavigationItem>
                { !props.isAdmin
                    ? <NavigationItem hideManageBooksListView={props.hideManageBooksListView} link='/my-books'  name='My Books'></NavigationItem>
                    : ''
                }
                { props.isAdmin
                    ?   <li className={classesNavItem.NavigationItem} onClick={props.manageBookShow}>
                            <a className={props.manageBookActiveClass ? classesNavItem.active : ''}>Manage Books<span className="caret"></span></a>
                        </li>
                    : ''
                }
                
            </Auxx>
        )
    }
    let manageBooksListView = null;
    if (props.showManageBooksList) {
        manageBooksListView = (
            <ul className={classes.ManageBooksList} onClick={props.hideManageBooksListView}>
                <NavigationItem link='/addbook' name='Add Book'></NavigationItem>
                <NavigationItem link='/admin/approve-books' name='Approve Books'></NavigationItem>
                <NavigationItem link='/admin/edit-delete' name='Edit/Delete Books'></NavigationItem>
            </ul>
        )
    }
    return(
        <div>
            <ul className={classes.NavigationItems}>
                {authNav}
                { !props.isAuthenticated 
                    ? <NavigationItem hideManageBooksListView={props.hideManageBooksListView} link='/login'  name='Login'></NavigationItem>
                    : <NavigationItem hideManageBooksListView={props.hideManageBooksListView} link='/logout'  name='Logout'></NavigationItem>
                }
            </ul>
            {manageBooksListView}
        </div>
    )
}

export default navigation;