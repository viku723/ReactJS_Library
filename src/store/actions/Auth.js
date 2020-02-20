import * as actionTypes from './actionTypes';
import axios from 'axios';

export const doLogin = (email, password) => {
    const authData = {
        email: email,
        password: password,
        returnSecureToken: true
    }
    const url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAq8p_FTdYkCMWaPeFLr5haLHz27JVN0Jo';
    return dispatch => {
        axios.post(url, authData)
            .then((response) => {
                const expirationDate = new Date((new Date().getTime() + response.data.expiresIn * 1000));
                localStorage.setItem('idToken', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('localId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId))
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch((error) => {
                dispatch(authFailed(error.response.data.error))
            })
    }
}

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}

export const authSuccess = (idToken, localId) => {
    return {
        type: actionTypes.AUTH_SUCESS,
        idToken: idToken,
        localId: localId
    }
}


export const checkAuthTimeout = (expiresIn) => {
    return dispatch => {
        setTimeout(() => {
            logout();
        }, expiresIn * 1000)
    }
}

export const logout = () => {
    localStorage.removeItem('idToken');
    localStorage.removeItem('localId');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const setAuthRedirect = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('idToken');
        if(!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if(expirationDate > new Date()) {
                dispatch(authSuccess(token, localStorage.getItem('localId')))
            } else {
                dispatch(logout());
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ))
            }
        }
    }
}