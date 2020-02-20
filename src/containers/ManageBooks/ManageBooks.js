import React, { Component } from 'react';
import { connect } from 'react-redux';
import { notify } from 'react-notify-toast';
import * as actions from '../../store/actions/index';

import ApproveIssueBooks from '../../components/ApproveIssueBooks/ApproveIssueBooks'
import EditDelete from '../../components/EditDelete/EditDelete';

class ManageBooks extends Component {
    state = {
        selectedBookId : ''
    }
    componentDidMount() {
        this.props.fetchPendingIssueBooks();
        this.props.fectchAllBooks();
    }
    approveBookHandler = () => {
        this.props.onBookIssueApprove(this.state.selectedBookId);
    }
    rejectIssueBookHandler = () => {
        this.props.onBookIssueReject(this.state.selectedBookId);
    }
    deleteBookHandler = () => {
        this.props.onDeleteBook(this.state.selectedBookId);
    }
    shouldComponentUpdate(nextProps) {
        console.log('nextProps', nextProps);
        if (nextProps.isIssueBookApproved) {
            notify.show('The book approved successfully', 'success');
            this.props.history.push('/books');
            return false;
        }
        if (nextProps.isIssueBookRejected) {
            notify.show('The book rejected successfully', 'success');
            this.props.history.push('/books');
            return false;
        }
        if(nextProps.isBookDeleted) {
            notify.show('Book Deleted Successfully', 'success');
            this.props.fectchAllBooks();
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
        let component = null;
        if(this.props.location.pathname == "/admin/approve-books") {
            component = <ApproveIssueBooks 
                            books={this.props.pendingIssueBooks}
                            approveBook={this.approveBookHandler}
                            rejectIssueBook={this.rejectIssueBookHandler}
                            selectedBookId={this.state.selectedBookId}
                            setBackground={this.setBackgroundHandler}></ApproveIssueBooks>
        } else if(this.props.location.pathname == "/admin/edit-delete") {
            component = <EditDelete 
                            books={this.props.allBooksData}
                            selectedBookId={this.state.selectedBookId}
                            deleteBook={this.deleteBookHandler}
                            setBackground={this.setBackgroundHandler}></EditDelete>
        }
        return(
            <div>
                {component}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        pendingIssueBooks: state.manageBooks.pendingIssueBooks,
        isIssueBookApproved: state.manageBooks.isIssueBookApproved,
        isIssueBookRejected: state.manageBooks.isIssueBookRejected,
        allBooksData: state.manageBooks.allBooksData,
        isBookDeleted: state.manageBooks.isBookDeleted,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPendingIssueBooks: () => {
            dispatch(actions.fetchPendingIssueBooks())
        },
        onBookIssueApprove: (bookId) => {
            dispatch(actions.approveIssueBook(bookId))
        },
        onBookIssueReject: (bookId) => {
            dispatch(actions.rejectIssueBook(bookId));
        },
        fectchAllBooks: () => {
            dispatch(actions.fectchAllBooks())
        },
        onDeleteBook: (bookId) => {
            dispatch(actions.deleteBook(bookId))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageBooks);