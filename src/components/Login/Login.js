import React from 'react';
import { Form, FormGroup, Col, FormControl, Button } from 'react-bootstrap';

const login = (props) => {
    return(
        <Form horizontal onSubmit={props.handleSigninSubmit}>
            <FormGroup controlId="formHorizontalEmail">
            <Col sm={2}>
                Email
            </Col>
            <Col sm={10}>
                <FormControl
                    type="email"
                    placeholder="Email"
                    value={props.email}
                    onChange={props.emailChangeHandler}/>
            </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
            <Col sm={2}>
                Password
            </Col>
            <Col sm={10}>
                <FormControl
                    type="password"
                    placeholder="Password"
                    value={props.password}
                    onChange={props.passwordChangeHandler}/>
            </Col>
            </FormGroup>

            <FormGroup>
            <Col smOffset={2} sm={1}>
                <Button type="submit" >
                Sign in
                </Button>
            </Col>
            {/*<Col smOffset={1} sm={7}>
                Create a new aacount
            </Col>*/}
            </FormGroup>
        </Form>
    )
}

export default login;