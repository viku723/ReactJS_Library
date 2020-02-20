import React, { Component } from 'react';
import { connect } from 'react-redux';
import { notify } from 'react-notify-toast';

import Login from '../../components/Login/Login';
import * as actions from '../../store/actions/index';

class Auth extends Component {
    state = {
        email: '',
        password: ''
    }
    emailChangeHandler = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    passwordChangeHandler = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleSigninSubmit = (event) => {
        this.props.onLogin(this.state.email, this.state.password);
        event.preventDefault();
    }
    shouldComponentUpdate(nextProps) {
        if (nextProps.isAuthenticated) {
            this.props.history.push('/books');
            return false;
        }
        if (nextProps.error) {
            notify.show(nextProps.error.message, 'error');
            return false;
        }
        return true;
    }
    render() {
        let login = null;
        if (this.props.location.pathname == '/login') {
            login = (
                <Login
                    emailChangeHandler={this.emailChangeHandler}
                    passwordChangeHandler={this.passwordChangeHandler}
                    handleSigninSubmit={this.handleSigninSubmit}>
                </Login>
            )
        }
        return(
            <div>
                {login}
            </div>
        )
    }
}

const mapStatesToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.idToken !== null,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (email, password) => {
            dispatch(actions.doLogin(email, password))
        }
    }
}
export default connect(mapStatesToProps, mapDispatchToProps)(Auth);