import React from 'react';
import classes from './EditDelete.css';
import { Table, Button } from 'react-bootstrap';

const editDelete = (props) => {
    return (
        <div>
            <div className={classes.ActionButtons}>
                <Button
                    disabled={props.selectedBookId == ''}
                    style={{'marginRight': '2%'}}
                    bsStyle="primary"
                >Edit</Button>
                <Button
                    disabled={props.selectedBookId == ''}
                    bsStyle="danger"
                    onClick={() => props.deleteBook()} >Delete</Button>
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
                        return (
                            <tr key={book.id} onClick={(event) => props.setBackground(event, book.id)} >
                                <td>{book.name}</td>
                                <td>{book.author}</td>
                                <td>{book.price}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default editDelete;