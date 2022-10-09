import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Send reequest to create account. User must activate using emailed link.
    const registerAccount = async () => {
        let response = await fetch('http://localhost:8000/auth/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                email: email,
                password: password,
                re_password: rePassword
            })
        });        
        let data = await response.json();

        // Check if account creation was successful
        if (response.status === 201) {
            setErrorMessage('Account created. Check email to verify account.');
            setEmail('');
            setPassword('');
            setRePassword('');
        } else if (data.email) {
            setErrorMessage(data.email[0]);
        } else if (data.password) {
            setErrorMessage(data.password[0]);
        } else {
            setErrorMessage('Error occurred while trying to create an account')
        }
    }

    return (
        <>
            <div className='container mt-5'>
                <h3 className='mb-3'>Register an Account</h3>

                <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label>Email</Form.Label>
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

                <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label>Repeat Password</Form.Label>
                    <Form.Control 
                        type='password' 
                        placeholder='Repeat Password'
                        value={rePassword}
                        onChange={e => setRePassword(e.target.value)} />
                </Form.Group>

                <p><b>{errorMessage}</b></p>

                <Button 
                    variant='primary' 
                    type='submit'
                    onClick={registerAccount}
                    >
                    Submit
                </Button>
            </div>
        </>
    );
}

export default Register;