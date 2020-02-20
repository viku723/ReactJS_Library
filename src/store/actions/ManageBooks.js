import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchPendingIssueBooks = () => {
    return dispatch => {
        axios.get('https://book-library-react.firebaseio.com/books.json?orderBy=%22isBorrowed%22&equalTo=true')
            .then((response) => {
                const fetchedBooks = [];
                for (let key in response.data) {
                    fetchedBooks.push({
                        ...response.data[key],
                        id: key
                    });
                }
                dispatch(fetchPendingIssueBooksSuccess(fetchedBooks));
            })
    }
}

export const fetchPendingIssueBooksSuccess = (pendingIssueBooks) => {
    return {
        type: actionTypes.FETCH_PENDING_ISSUE_BOOKS,
        pendingIssueBooks: pendingIssueBooks
    }
}

export const approveIssueBook = (id) => {
    const data = {
        isBorrowedApproved: true
    }
    return dispatch => {
        axios.patch('https://book-library-react.firebaseio.com/books/'+ id +'.json', data)
            .then((response) => {
                dispatch(approveIssueBookSuccess());
            })
    }
}

export const approveIssueBookSuccess = () => {
    return {
        type: actionTypes.APPROVE_FETCH_BOOK_SUCCESS
    }
}

export const rejectIssueBook = (id) => {
    const data = {
        isBorrowed: false
    }
    return dispatch => {
        axios.patch('https://book-library-react.firebaseio.com/books/'+ id +'.json', data)
            .then((response) => {
                dispatch(rejectIssueBookSuccess());
            })
    }
}

export const rejectIssueBookSuccess = () => {
    return {
        type: actionTypes.REJECT_ISSUE_REQUEST_BOOK
    }
}

export const fectchAllBooks = () => {
    return dispatch => {
        axios.get('https://book-library-react.firebaseio.com/books.json')
        .then((response) => {
            const fetchedBooks = [];
                for (let key in response.data) {
                    fetchedBooks.push({
                        ...response.data[key],
                        id: key
                    });
                }
            dispatch(fetchAllBookSuccess(fetchedBooks))
        });
    }
}

export const fetchAllBookSuccess = (allBooksData) => {
    return {
        type: actionTypes.FETCH_ALL_BOOKS_SUCCESS,
        allBooksData: allBooksData
    }
}

export const deleteBook = (id) => {
    return dispatch => {
        axios.delete('https://book-library-react.firebaseio.com/books/'+ id +'.json')
        .then((response) => {
            dispatch(deleteBookSuccess())
        })
    }
}

export const deleteBookSuccess = () => {
    return {
        type: actionTypes.DELETE_BOOK_SUCCESS
    }
}