import React, { Component } from 'react';
import axios from 'axios'
import { connect } from 'react-redux';
import { notify } from 'react-notify-toast';
import * as actions from '../../store/actions/index';
import * as actionTypes from '../../store/actions/actionTypes';

import BooksList from '../../components/BooksList/BooksList';
import MyBooks from '../../components/MyBooks/MyBooks';

class Books extends Component {
    state = {
        selectedBookId : ''
    }
    componentDidMount() {
        console.log('books-componentDidMount')
        this.props.onFetchBooks();
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname !== this.props.location.pathname && nextProps.location.pathname === '/my-books') {
            console.log('willRecieve')
            this.props.onMyBooks();
        }
    }
    onBookDetailsHandler = (book) => {
        this.props.onBookDetailsShow(book);
    }
    returnBookHandler = (bookId) => {
        this.props.onReturnBook(this.state.selectedBookId);
        this.setState({
            selectedBookId: ''
        })
    }
    shouldComponentUpdate(nextProps) {
        if(nextProps.isBookReturned) {
            notify.show('Your Book returned successfully', 'success');
            this.props.onMyBooks();
            return false;
        }
        return true;
    }
    setBackgroundHandler = (event, bookId) => {
        this.setState({
            selectedBookId: bookId
        })
        for (var i = 0; i < event.target.parentNode.parentNode.children.length; i++) {
            event.target.parentNode.parentNode.children[i].setAttribute("style", "background-color:#FFF;");
        }
        event.target.parentNode.setAttribute("style", "background-color:#ffff336e;");
    }
    render() {
        return (
            <div>
                { this.props.location.pathname === '/books'
                    ?   <BooksList
                            books={this.props.booksData}
                            bookDetails={this.onBookDetailsHandler}>
                        </BooksList>
                    :   <MyBooks
                            books={this.props.myBooks}
                            returnBook={this.returnBookHandler}
                            selectedBookId={this.state.selectedBookId}
                            setBackground={this.setBackgroundHandler}>
                        </MyBooks>
                }
            </div>
        )
    }
}

const mapStatesToProps = (state) => {
    return {
        booksData: state.books.booksData,
        myBooks: state.books.myBooks,
        isBookReturned: state.books.isBookReturned
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchBooks: () => {
            return dispatch(actions.fetchBooks())
        },
        onBookDetailsShow: (book) => {
            return dispatch(actions.showBookDetails(book))
        },
        onMyBooks: () => {
            return dispatch(actions.fetchMyBooks())
        },
        onReturnBook: (bookId) => {
            return dispatch(actions.returnBook(bookId))
        }
    } 
}
export default connect(mapStatesToProps, mapDispatchToProps)(Books);