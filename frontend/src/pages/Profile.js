import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';

function Profile() {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    // Send request to fetch user profile
    const loadUserProfile = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/profiles/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
              },
        });    
        let data = await response.json();

        if (data.profile) {
            setEmail(data.email);
            setFirstName(data.profile.first_name);
            setLastName(data.profile.last_name);            
            setPhone(data.profile.phone);
            setCity(data.profile.city);
            setState(data.profile.state)     ;
        }
    }

    // Sends request to update profile
    const updateProfile = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/profiles/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
              },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                phone: phone,
                city: city,
                state: state
            }),
        });    
        let data = await response.json();

        if (data.error) {
            alert('Error while updating profile')
        }
    }

    useEffect(() => {
        loadUserProfile();
    }, []);

    return (
        <>
            <h3 className='m-3'>Edit User Profile</h3>
            <h5 className='m-3'>Username: {email}</h5>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label className='ms-3 me-3'>First Name</Form.Label>
                <Form.Control
                    className='ms-3 me-3'
                    type='text' 
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)} />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label className='ms-3 me-3'>Last Name</Form.Label>
                <Form.Control
                    className='ms-3 me-3'
                    type='text' 
                    value={lastName}
                    onChange={e => setLastName(e.target.value)} />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label className='ms-3 me-3'>Phone</Form.Label>
                <Form.Control
                    className='ms-3 me-3'
                    type='tel' 
                    value={phone}
                    onChange={e => setPhone(e.target.value)} />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label className='ms-3 me-3'>City</Form.Label>
                <Form.Control
                    className='ms-3 me-3'
                    type='text' 
                    value={city}
                    onChange={e => setCity(e.target.value)} />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label className='ms-3 me-3'>City</Form.Label>
                <Form.Control
                    className='ms-3 me-3'
                    type='text' 
                    value={state}
                    onChange={e => setState(e.target.value)} />
            </Form.Group>

            <Button
                className='ms-3'
                variant='primary' 
                type='submit'
                onClick={updateProfile}>
                Submit
            </Button>
    </>
    );
}

export default Profile;