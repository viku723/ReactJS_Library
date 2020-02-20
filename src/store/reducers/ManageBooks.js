import * as actionTypes from '../actions/actionTypes';

const initialState = {
    allBooksData: [],
    pendingIssueBooks: [],
    isIssueBookApproved: false,
    isIssueBookRejected: false,
    isBookDeleted: false
}
const manageBookReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_PENDING_ISSUE_BOOKS: {
            return {
                ...state,
                pendingIssueBooks: action.pendingIssueBooks,
                isIssueBookApproved: false,
                isIssueBookRejected: false,
                isBookDeleted: false
            }
        }
        case actionTypes.APPROVE_FETCH_BOOK_SUCCESS: {
            return {
                ...state,
                isIssueBookApproved: true
            }
        }
        case actionTypes.REJECT_ISSUE_REQUEST_BOOK: {
            return {
                ...state,
                isIssueBookRejected: true
            }
        }
        case actionTypes.FETCH_ALL_BOOKS_SUCCESS: {
            return {
                ...state,
                allBooksData: action.allBooksData,
                isBookDeleted: false
            }
        }
        case actionTypes.DELETE_BOOK_SUCCESS: {
            return {
                ...state,
                isBookDeleted: true
            }
        }
        default: {
            return state
        }
    }
}

export default manageBookReducer;