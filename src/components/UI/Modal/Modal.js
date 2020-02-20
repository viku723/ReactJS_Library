import React, { Component } from 'react';
import { Modal,  Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { notify } from 'react-notify-toast';
import * as actions from '../../../store/actions/index';

class ModalBootstrap extends Component {
    modalCloseHandler = () => {
        this.props.onCloseModal();
    }
    onReserve = (bookId) => {
        this.props.onReserveBook(bookId);
    }
    
    render() {
        let reserveButton = null;
        if(!this.props.bookDetails.isBorrowed && !this.props.isAdmin) {
            reserveButton = <Button bsStyle="primary" onClick={() => this.onReserve(this.props.bookDetails.id)} >Reserve</Button>
        }
        if(this.props.isBookReserved) {
            notify.show('Your Book reserved successfully', 'success');
            return null;
        }
         return(
            <Modal show={this.props.isShow}>
                <Modal.Header>
                    <Modal.Title>{this.props.bookDetails.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{'padding': '10px'}}>
                        <label>Author:</label> &nbsp;
                        {this.props.bookDetails.author}
                    </div>
                    <div style={{'padding': '10px'}}>
                        <label>Price:</label>&nbsp;
                        {this.props.bookDetails.price}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.modalCloseHandler}>Close</Button>
                    {reserveButton}
                </Modal.Footer>
            </Modal>
        )
    }
}

const mapStatesToProps = (state) => {
    return {
        isShow: state.books.isShowBookDetails,
        bookDetails: state.books.bookDetails,
        isBookReserved: state.books.isBookReserved,
        isAdmin: state.auth.isAdmin
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCloseModal: () => {
            return dispatch(actions.closeModal())
        },
        onReserveBook: (bookId) => {
            return dispatch(actions.reserveBook(bookId))
        }
    }
}
export default connect(mapStatesToProps, mapDispatchToProps)(ModalBootstrap);