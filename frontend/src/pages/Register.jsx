import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

import {
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';

import { auth } from '../firebase';

function Register() {

    const navigate = useNavigate();

    // ONLY EMAIL NOW
    const [formData, setFormData] = useState({
        email: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');




    const handleChange = (e) => {

        setError('');
        setSuccess('');

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };




    // GOOGLE REGISTER
    const googleRegister = async () => {

        try {

            const provider = new GoogleAuthProvider();

            provider.setCustomParameters({
                prompt: 'select_account'
            });

            const result = await signInWithPopup(
                auth,
                provider
            );

            const user = result.user;

            const res = await API.post(
                '/auth/google-auth',
                {
                    name: user.displayName,
                    email: user.email,
                    image: user.photoURL
                }
            );

            localStorage.setItem(
                'token',
                res.data.token
            );

            setSuccess('Login successful');

            navigate('/dashboard');

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
    setSuccess('');

    if (!formData.email.trim()) {
        return setError('Email is required');
    }

    try {
        const res = await API.post('/auth/Registration', formData);

        setSuccess(res.data.message);

        // ✅ SAVE EMAIL (IMPORTANT FIX)
        localStorage.setItem('otpEmail', formData.email);

        // ✅ NAVIGATE TO OTP PAGE
        setTimeout(() => {
            navigate('/verify-otp', {
                state: { email: formData.email }
            });
        }, 1000);

    } catch (error) {
        setError(
            error?.response?.data?.message ||
            'Failed to send OTP'
        );
    }
};




    return (

        <div style={pageStyle}>

            <div style={cardStyle}>

                <h2 style={titleStyle}>
                    Create Account
                </h2>

                <p style={subText}>
                    Enter your email to receive OTP
                </p>




                {/* ERROR */}
                {
                    error && (

                        <div style={errorBox}>
                            {error}
                        </div>
                    )
                }




                {/* SUCCESS */}
                {
                    success && (

                        <div style={successBox}>
                            {success}
                        </div>
                    )
                }




                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        onChange={handleChange}
                        style={inputStyle}
                    />




                    <button
                        type="submit"
                        style={buttonStyle}
                    >
                        Send OTP
                    </button>




                    <button
                        type="button"
                        onClick={googleRegister}
                        style={googleBtn}
                    >
                        Continue with Google
                    </button>

                </form>

            </div>

        </div>
    );
}




// STYLES
const pageStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f6fa',
    fontFamily: 'Arial, sans-serif'
};

const cardStyle = {
    background: '#fff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    width: '350px'
};

const titleStyle = {
    textAlign: 'center',
    marginBottom: '10px',
    color: '#333'
};

const subText = {
    textAlign: 'center',
    fontSize: '14px',
    color: '#666',
    marginBottom: '20px'
};

const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    outline: 'none'
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

const errorBox = {
    background: '#ffe5e5',
    color: '#d8000c',
    padding: '10px',
    borderRadius: '6px',
    marginBottom: '12px'
};

const successBox = {
    background: '#eafaf1',
    color: '#27ae60',
    padding: '10px',
    borderRadius: '6px',
    marginBottom: '12px'
};

export default Register;