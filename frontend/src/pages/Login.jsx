import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

import API from '../services/api';
import { useNavigate } from 'react-router-dom';

import {
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';

import { auth } from '../firebase';

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');



    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };



    // GOOGLE LOGIN (NEW)
    const googleLogin = async () => {

        try {

            const provider = new GoogleAuthProvider();

            // ✅ FORCE ACCOUNT SELECT
            provider.setCustomParameters({
                prompt: 'select_account'
            });

            const result = await signInWithPopup(auth, provider);

            const user = result.user;

            const res = await API.post('/auth/google-auth', {
                name: user.displayName,
                email: user.email,
                image: user.photoURL
            });

            localStorage.setItem('token', res.data.token);

            const decoded = jwtDecode(res.data.token);

            if (decoded.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }

        } catch (error) {

            setError(
                error?.response?.data?.message ||
                error.message
            );
        }
    };



    const handleSubmit = async (e) => {

        e.preventDefault();

        setError('');

        try {

            const res = await API.post(
                '/auth/login',
                formData
            );

            localStorage.setItem(
                'token',
                res.data.token
            );

            const decoded = jwtDecode(res.data.token);

            if (decoded.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }

        } catch (error) {

            setError(
                error?.response?.data?.message ||
                error.message
            );
        }
    };



    return (

        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f5f6fa',
            fontFamily: 'Arial, sans-serif'
        }}>

            <div style={{
                background: '#fff',
                padding: '30px',
                borderRadius: '12px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                width: '350px'
            }}>

                <h2 style={{
                    textAlign: 'center',
                    marginBottom: '20px',
                    color: '#333'
                }}>
                    Login
                </h2>



                {/* ERROR */}
                {error && (
                    <div style={{
                        background: '#ffe5e5',
                        color: '#d8000c',
                        padding: '10px',
                        borderRadius: '6px',
                        marginBottom: '12px'
                    }}>
                        {error}
                    </div>
                )}



                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        onChange={handleChange}
                        style={inputStyle}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        onChange={handleChange}
                        style={inputStyle}
                    />



                    <button
                        type="submit"
                        style={buttonStyle}
                    >
                        Login
                    </button>



                    {/* GOOGLE LOGIN BUTTON */}
                    <button
                        type="button"
                        onClick={googleLogin}
                        style={googleBtn}
                    >
                        Continue with Google
                    </button>

                </form>



                <p style={{
                    marginTop: '15px',
                    textAlign: 'center'
                }}>
                    Don't have an account? {' '}
                    <Link to="/register">
                        Signup
                    </Link>
                </p>

            </div>

        </div>
    );
}



// STYLES
const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '12px',
    borderRadius: '6px',
    border: '1px solid #ccc'
};

const buttonStyle = {
    width: '100%',
    padding: '10px',
    background: '#333',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold'
};

const googleBtn = {
    width: '100%',
    padding: '10px',
    marginTop: '10px',
    background: '#fff',
    color: '#333',
    border: '1px solid #ccc',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold'
};

export default Login;
