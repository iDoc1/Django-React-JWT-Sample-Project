import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar({isAuthenticated, logout}) {

    // Links to show if user has not logged in
    const guestLinks = (
        <>
            <Nav.Link href='/login'>Login</Nav.Link>
            <Nav.Link href='/signup'>Sign Up</Nav.Link>
        </>
    );

    // Links to show if user has logged in
    const authLinks = (
        <>
            <Nav.Link href='/profile'>Profile</Nav.Link>
            <Nav.Link onClick={logout}>Logout</Nav.Link>
        </>
    );

    return (
        <>
            <Navbar bg='dark' variant='dark'>
                <Container>
                <Navbar.Brand href='/'>Session Auth</Navbar.Brand>
                <Nav className='me-auto'>
                    <Nav.Link href='/'>Home</Nav.Link>
                    {isAuthenticated ? authLinks : guestLinks}
                </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default NavBar;