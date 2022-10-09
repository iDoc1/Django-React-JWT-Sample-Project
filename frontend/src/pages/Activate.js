import React from 'react';
import Button from 'react-bootstrap/Button';
import { useParams, useNavigate } from 'react-router-dom';

function Activate() {
    const { uid } = useParams();
    const { token } = useParams();

    const navigate = useNavigate();
    
    // Activate account
    const verifyAccount = async () => {      
        let repsonse = await fetch('http://localhost:8000/auth/users/activation/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uid: uid,
                token: token
            })
        });

        // If activation successful route to login pate
        if (repsonse.status === 204) {
            navigate('/login');
        } else {
            alert('Could not activate account');
        }
    }

    return (
        <>
            <div className='container mt-5'>
                <h1>Activate your Account</h1>
                <Button 
                    variant='primary' 
                    type='submit'
                    onClick={verifyAccount}>
                    Activate
                </Button>
            </div>
        </>
    );
}

export default Activate;