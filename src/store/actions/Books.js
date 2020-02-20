import * as actionTypes from './actionTypes';
import axios from 'axios';

export const closeModal = () => {
    return {
        type: actionTypes.CLOSE_MODAL
    }
}
export const showBookDetails = (book) => {
    return {
        type: actionTypes.SHOW_BOOK_DETAILS,
        book: book
    }
}
export const fetchBooksSuccess = (fetchedBooks) => {
    return {
        type: actionTypes.FETCH_BOOKS,
        fetchedBooks: fetchedBooks
    }
}

export const fetchingBooks = () => {
    return {
        type: actionTypes.FETCHING_BOOKS
    }
}

export const fetchBooks = () => {
    return dispatch => {
        dispatch(fetchingBooks())
        axios.get('https://book-library-react.firebaseio.com/books.json').then(
            (response) => {
                const fetchedBooks = [];
                for (let key in response.data) {
                    fetchedBooks.push({
                        ...response.data[key],
                        id: key
                    });
                }
                dispatch(fetchBooksSuccess(fetchedBooks));
            }
        )
    }
}

export const fetchMyBooks = () => {
    return dispatch => {
        dispatch(fetchingBooks())
        axios.get('https://book-library-react.firebaseio.com/books.json?orderBy="borrowedBy"&equalTo="'+ localStorage.getItem('localId') +'"').then(
            (response) => {
                const fetchedBooks = [];
                for (let key in response.data) {
                    fetchedBooks.push({
                        ...response.data[key],
                        id: key
                    });
                }
                dispatch(fetchMyBooksSuccess(fetchedBooks));
            }
        )
    }
}

export const fetchMyBooksSuccess = (fetchedMyBooks) => {
    return {
        type: actionTypes.FETCH_MY_BOOKS,
        fetchedMyBooks: fetchedMyBooks
    }
}

export const reserveBook = (id) => {
    return dispatch => {
        const data = {
            isBorrowed: true,
            borrowedBy: localStorage.getItem('localId')
        }
        axios
            .patch('https://book-library-react.firebaseio.com/books/'+ id +'.json', data)
            .then((response) => {
                dispatch(reserveBookSuccess());
                dispatch(fetchBooks());
            })
    }
}

export const reserveBookSuccess = () => {
    return {
        type: actionTypes.RESERVE_BOOK_SUCCESS
    }
}

export const returnBook = (id) => {
    return dispatch => {
        const data = {
            isBorrowed: false,
            isBorrowedApproved: false
        }
        axios
            .patch('https://book-library-react.firebaseio.com/books/'+ id +'.json', data)
            .then((response) => {
                dispatch(returnBookSuccess());
                dispatch(fetchBooks());
            })
    }
}

export const returnBookSuccess = () => {
    return {
        type: actionTypes.RETURN_BOOK_SUCCESS
    }
}

export const addBook = (booksData) => {
    return dispatch => {
        axios.post('https://book-library-react.firebaseio.com/books.json', booksData)
            .then((response) => {
                dispatch(addBookSuccess());
            });
    }
}

export const addBookSuccess = () => {
    return {
        type: actionTypes.ADD_BOOK_SUCCESS
    }
}