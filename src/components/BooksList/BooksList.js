import React from 'react';
import { Table, Button } from 'react-bootstrap';

const bookList = (props) => {
    return (
        <Table striped bordered condensed hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Book Name</th>
                <th>Author</th>
                <th>Price</th>
                <th>Availability</th>
            </tr>
            </thead>
            <tbody>
                {props.books.map((book, index) => {
                    return (
                        <tr key={book.id} onClick={() => props.bookDetails(book)}>
                            <td>{index+1}</td>
                            <td ><a>{book.name}</a></td>
                            <td>{book.author}</td>
                            <td>{book.price}</td>
                            <td>
                                {book.isBorrowed ? book.isBorrowedApproved ? ' Issued': 'Issued - Pending': 'Available'}
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    );
}

export default bookList;