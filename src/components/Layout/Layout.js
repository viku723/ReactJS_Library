import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Aux from '../../hoc/Auxx/Auxx';
import classes from './Layout.css';
import Modal from '../UI/Modal/Modal';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false,
        showManageBooksList: false
    }

    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    }
    showManageBooksListHandler = () => {
        this.setState((nextState) => {
            return  {
                showManageBooksList: !nextState.showManageBooksList
            }
        })
    }
    hideManageBooksListViewHandler = () => {
        this.setState({
            showManageBooksList: false
        })
    }

    render () {
        const path = this.props.location.pathname;
        let manageBookActiveClass = false;
        if(path === '/addbook' || path === '/admin/approve-books' || path ==='/admin/edit-delete') {
            manageBookActiveClass = true;
        }
        return (
            <Aux>
                <Modal ></Modal>
                <Toolbar
                    isAdmin={this.props.isAdmin}
                    isAuthenticated={this.props.isAuthenticated}
                    drawerToggleClicked={this.sideDrawerToggleHandler}
                    showManageBooksList={this.state.showManageBooksList}
                    manageBookShow={this.showManageBooksListHandler}
                    hideManageBooksListView={this.hideManageBooksListViewHandler}
                    manageBookActiveClass={manageBookActiveClass} />
                <SideDrawer
                    isAdmin={this.props.isAdmin}
                    isAuthenticated={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closeModal={this.sideDrawerClosedHandler}
                    showManageBooksList={this.state.showManageBooksList}
                    manageBookShow={this.showManageBooksListHandler}
                    hideManageBooksListView={this.hideManageBooksListViewHandler}
                    manageBookActiveClass={manageBookActiveClass}  />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}


export default withRouter(Layout);