import * as actionTypes from '../actions/actionTypes';
const initialState = {
    error: null,
    loading: false,
    idToken: null,
    localId:null,
    isAdmin: false
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_SUCESS: {
            let isAdmin = false;
            /* Since backend doesn't support whether user admin or not, Hardcoded in Frontend */
            if (action.localId === 'NwVEYYFteSTzNVgMLl5KCKwwF573') {
                isAdmin = true
            }
            return {
                ...state,
                loading: false,
                idToken: action.idToken,
                localId: action.localId,
                error: null,
                isAdmin: isAdmin
            }
        }
        case actionTypes.AUTH_START: {
            return {
                ...state,
                loading: true,
                error: null,
                isAdmin: false
            }
        }
        case actionTypes.AUTH_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error
            }
        }
        case actionTypes.AUTH_LOGOUT: {
            return {
                ...state,
                idToken: null,
                localId: null,
                isAdmin: false
            }
        }
        default: {
            return state
        }
    }
}

export default authReducer;