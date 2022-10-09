import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({isAuthenticated, setIsAuthenticated}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    // Attempts to log user in
    const login = async () => {

        let response = await fetch('http://localhost:8000/auth/jwt/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                email: email,
                password: password
            }),
            credentials: 'include'
        });        
        let data = await response.json();

        // If logging in was successful, set local storage state for access and refresh tokens
        if (response.status === 200) {
            setIsAuthenticated(true);

            localStorage.setItem('access', data.access);
            localStorage.setItem('refresh', data.refresh);

            navigate('/');
        } else {
            setIsAuthenticated(false);
            alert('Login failed. Ensure email and password are correct.')
        }
    }

    // Redirect if user already authenticated
    if (isAuthenticated) {
        navigate('/');
    }

    return (
        <>
            <div className='container mt-5'>
                <h3 className='mb-3'>Sign In</h3>

                <Form.Group className='mb-3' controlId='formBasicUsername'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='Email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                         />
                </Form.Group>  

                <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type='password' 
                        placeholder='Password'
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                </Form.Group>  

                <Button 
                    variant='primary' 
                    type='submit'
                    onClick={login}>
                    Submit
                </Button>
            </div>
        </>
    );
}

export default Login;