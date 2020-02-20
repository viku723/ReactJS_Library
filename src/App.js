import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Notifications from 'react-notify-toast';
import ReactLoading from 'react-loading';
import { connect } from 'react-redux';
import classes from './App.css';

import Books from './containers/Books/Books';
import Layout from './components/Layout/Layout';
import AddBoook from './components/AddBook/AddBook';
import Login from './components/Login/Login';
import ManageBooks from './containers/ManageBooks/ManageBooks';
import Auth from './containers/Auth/Auth';
import * as actions from './store/actions/index';
import Logout from './components/Logout/Logout';


class App extends Component {
	componentDidMount() {
		this.props.onAuthAutoLogin();
	}
	render() {
		let loading = null;
		if(this.props.isLoading || this.props.isAuthLoading) {
			loading = <ReactLoading type='spinningBubbles' color='#444' className={classes.Loading} />
		}
		return (
			<Layout isAuthenticated={this.props.isAuthenticated} isAdmin={this.props.isAdmin}>
				{loading}
				<Notifications />
				<Switch>
					<Route path="/login" component={Auth} />
					<Route path="/logout" component={Logout} />
					<Route path="/books" component={Books} />
					<Route path="/my-books" component={Books} />
					<Route path="/addbook" component={AddBoook} />
					<Route path="/admin/approve-books" component={ManageBooks} />
					<Route path="/admin/edit-delete" component={ManageBooks} />
				</Switch>
			</Layout>
		);
	}
}

const mapStatesToProps = (state) => {
	return {
		isLoading: state.books.isLoading,
		isAuthLoading: state.auth.loading,
		isAuthenticated: state.auth.idToken !== null,
		isAdmin: state.auth.isAdmin
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		onAuthAutoLogin: () => { dispatch(actions.authCheckState()) }
	}
  }

export default withRouter(connect(mapStatesToProps, mapDispatchToProps)(App));
