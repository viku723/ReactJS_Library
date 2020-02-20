import React from 'react';
import classes from './MyBooks.css';
import { Table, Button } from 'react-bootstrap';

const myBooks = (props) => {
    console.log('mybook')
    return (
        <div>
            <div className={classes.ActionButtons}>
                <Button
                    disabled={props.selectedBookId === ''}
                    style={{'marginRight': '2%'}}
                    bsStyle="primary"
                    onClick={() => props.returnBook(props.selectedBookId)}>Return</Button>
            </div>
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>Book Name</th>
                        <th>Author</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {props.books.map((book, index) => {
                        if(book.isBorrowed) {
                            return (
                                <tr key={book.id} onClick={(event) => props.setBackground(event, book.id)} >
                                    <td>{book.name}</td>
                                    <td>{book.author}</td>
                                    <td>{book.price}</td>
                                </tr>
                            )
                        }
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default myBooks;