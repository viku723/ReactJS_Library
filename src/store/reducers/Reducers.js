import { combineReducers } from 'redux';

import booksReducer from './Books';
import manageBookReducer from './ManageBooks';
import authReducer from './Auth';

const reducer = combineReducers({
    books: booksReducer,
    manageBooks: manageBookReducer,
    auth: authReducer
})

export default reducer;