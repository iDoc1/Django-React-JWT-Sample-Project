import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Activate from './pages/Activate';
import Profile from './pages/Profile';
import ResetPassword from './pages/ResetPassword';
import ResetPasswordConfirm from './pages/ResetPasswordConfirm';
import Navbar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

    const [isAuthenticated, setIsAuthenticated] = useState(null);

    // Checks if user is authenticated if an access toekn exists
    const checkAuthenticated = async () => {
        if (localStorage.getItem('access')) {
            let response = await fetch('http://localhost:8000/auth/jwt/verify/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    token: localStorage.getItem('access')
                })
            });

            if (response.status === 200) {
                setIsAuthenticated(true);  // Set user to the user object returned
            } else {
                setIsAuthenticated(false);
            }
        }
    }

    // Clears local storage to log out user
    const logout = async () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        setIsAuthenticated(false);
    }

    useEffect(() => {
        checkAuthenticated();
    }, []);

    return (
        <>
            <Router>
                <Navbar 
                    isAuthenticated={isAuthenticated}
                    logout={logout} />
                <Routes>
                    <Route exact path='/' element={
                        <Home
                            isAuthenticated={isAuthenticated} />} />
                    <Route exact path='/login' element={
                        <Login 
                            isAuthenticated={isAuthenticated}
                            setIsAuthenticated={setIsAuthenticated} />} />
                    <Route exact path='/signup' element={<SignUp />} />
                    <Route exact path='/reset-password' element={<ResetPassword />} />
                    <Route exact path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm />} />
                    <Route exact path='/activate/:uid/:token' element={<Activate />} />
                    <Route exact path='profile' element={<Profile />} />
                </Routes>
            </Router>
        </>
  );
}

export default App;
