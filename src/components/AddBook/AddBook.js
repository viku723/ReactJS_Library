import React, { Component } from 'react';
import { Form, FormGroup, Col, FormControl, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { notify } from 'react-notify-toast';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class AddBook extends Component {
    state = {
        name: '',
        author: '',
        price: ''
    }
    nameChangeHandler = (event) => {
        this.setState({
            name: event.target.value
        })
    }
    authorChangeHandler = (event) => {
        this.setState({
            author: event.target.value
        })
    }
    priceChangeHandler = (event) => {
        this.setState({
            price: event.target.value
        })
    }

    handleSubmit = (event) => {
        const booksData = {
            ...this.state,
            id: Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36),
            isBorrowed: false,
            isBorrowedApproved: false
        }
        this.props.onAddBook(booksData);
        event.preventDefault();
    }
    shouldComponentUpdate(nextProps) {
        if(nextProps.isBookAdded) {
            notify.show('Book added successfuly', 'success');
            this.props.history.push('/books');
            return false;
        }
        return true;
    }
    render() {
        return(
            <Form horizontal onSubmit={this.handleSubmit}>
            <FormGroup controlId="formHorizontalEmail">
            <Col sm={2}>
                Book Name
            </Col>
            <Col sm={10}>
                <FormControl
                    type="text" 
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.nameChangeHandler.bind(this)} />
            </Col>
            </FormGroup>
        
            <FormGroup controlId="formHorizontalPassword">
            <Col sm={2}>
                Author
            </Col>
            <Col sm={10}>
                <FormControl
                    type="text"
                    placeholder="Author"
                    value={this.state.author}
                    onChange={this.authorChangeHandler.bind(this)}/>
            </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
            <Col sm={2}>
                price
            </Col>
            <Col sm={10}>
                <FormControl
                    type="text"
                    placeholder="Price"
                    value={this.state.price}
                    onChange={this.priceChangeHandler.bind(this)}/>
            </Col>
            </FormGroup>

        
            <FormGroup>
            <Col smOffset={2} sm={10}>
                <Button type="submit">
                    Add Book
                </Button>
            </Col>
            </FormGroup>
        </Form>
        )
    }
}
const mapStatesToProps = (state) => {
    return {
        isBookAdded: state.books.isBookAdded
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddBook: (bookData) => {
            dispatch(actions.addBook(bookData))
        }
    }
}

export default connect(mapStatesToProps, mapDispatchToProps)(AddBook);