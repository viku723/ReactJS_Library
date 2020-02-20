import * as actionTypes from '../actions/actionTypes';

const initialState = {
    booksData: [],
    isLoading: false,
    isShowBookDetails: false,
    bookDetails: {},
    isBookDeleted: false,
    isBookReserved: false,
    isBookReturned: false,
    isBookAdded: false,
    myBooks: []
}

const booksReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_BOOKS: {
            return {
                ...state,
                booksData: action.fetchedBooks,
                isLoading: false,
                isBookDeleted: false,
                isBookReserved: false,
                isShowBookDetails: false,
                isBookReturned: false,
                isBookAdded: false
            }
        }
        case actionTypes.FETCHING_BOOKS: {
            return {
                ...state,
                isLoading: true
            }
        }
        case actionTypes.SHOW_BOOK_DETAILS: {
            return {
                ...state,
                isShowBookDetails: true,
                bookDetails: action.book
            }
        }
        case actionTypes.CLOSE_MODAL: {
            return {
                ...state,
                isShowBookDetails: false
            }
        }

        case actionTypes.RESERVE_BOOK_SUCCESS: {
            return {
                ...state,
                isBookDeleted: false,
                isBookReserved: true
            }
        }

        case actionTypes.RETURN_BOOK_SUCCESS: {
            return {
                ...state,
                isBookDeleted: false,
                isBookReserved: false,
                isBookReturned: true
            }
        }

        case actionTypes.ADD_BOOK_SUCCESS: {
            return {
                ...state,
                isBookAdded: true
            }
        }

        case actionTypes.FETCH_MY_BOOKS: {
            return {
                ...state,
                myBooks: action.fetchedMyBooks,
                isLoading: false,
                isBookDeleted: false,
                isBookReserved: false,
                isShowBookDetails: false,
                isBookReturned: false,
                isBookAdded: false
            }
        }

        default: {
            return state
        }
    }
}

export default booksReducer;