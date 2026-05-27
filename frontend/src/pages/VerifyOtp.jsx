import { useState } from 'react';

import API from '../services/api';

import {
    useNavigate,
    useLocation
} from 'react-router-dom';

function VerifyOtp() {

    const navigate = useNavigate();

    const location = useLocation();

    // ✅ FIX: email from router OR localStorage fallback
    const email =
        location.state?.email ||
        localStorage.getItem('otpEmail') ||
        '';



    const [formData, setFormData] = useState({

        name: '',

        password: '',

        otp: ''
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



    const handleSubmit = async (e) => {

        e.preventDefault();

        setError('');

        setSuccess('');

        // VALIDATION
        if (
            !formData.name.trim() ||
            !formData.password.trim() ||
            !formData.otp.trim()
        ) {
            return setError('All fields are required');
        }

        // ✅ FIX: email safety check
        if (!email) {
            return setError('Email missing. Please register again.');
        }

        try {

            const res = await API.post(
                '/auth/verify-otp',
                {
                    email,
                    name: formData.name,
                    password: formData.password,
                    otp: formData.otp
                }
            );

            setSuccess(res.data.message);

            // ✅ CLEAR TEMP EMAIL AFTER SUCCESS
            localStorage.removeItem('otpEmail');

            setTimeout(() => {
                navigate('/login');
            }, 1200);

        } catch (error) {

            setError(
                error?.response?.data?.message ||
                'OTP verification failed'
            );
        }
    };



    return (

        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: '#f5f6fa',
            fontFamily: 'Arial, sans-serif',
            padding: '20px'
        }}>

            <div style={{
                width: '100%',
                maxWidth: '400px',
                background: '#fff',
                padding: '35px',
                borderRadius: '14px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>

                <h2 style={{
                    textAlign: 'center',
                    marginBottom: '10px',
                    color: '#333'
                }}>
                    Verify Your Account
                </h2>



                <p style={{
                    textAlign: 'center',
                    color: '#666',
                    marginBottom: '20px',
                    fontSize: '14px',
                    lineHeight: '22px'
                }}>
                    We sent a verification code to
                    <br />
                    <b>{email}</b>
                </p>



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



                {/* SUCCESS */}
                {success && (
                    <div style={{
                        background: '#eafaf1',
                        color: '#27ae60',
                        padding: '10px',
                        borderRadius: '6px',
                        marginBottom: '12px'
                    }}>
                        {success}
                    </div>
                )}



                <form onSubmit={handleSubmit}>

                    {/* NAME */}
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        style={inputStyle}
                    />



                    {/* PASSWORD */}
                    <input
                        type="password"
                        name="password"
                        placeholder="Create Password"
                        value={formData.password}
                        onChange={handleChange}
                        style={inputStyle}
                    />



                    {/* OTP */}
                    <input
                        type="text"
                        name="otp"
                        placeholder="Enter 6-digit OTP"
                        value={formData.otp}
                        onChange={handleChange}
                        style={inputStyle}
                    />



                    <button
                        type="submit"
                        style={buttonStyle}
                    >
                        Verify Account
                    </button>

                </form>

            </div>

        </div>
    );
}



// STYLES
const inputStyle = {

    width: '100%',

    padding: '12px',

    marginBottom: '14px',

    border: '1px solid #ccc',

    borderRadius: '6px',

    outline: 'none',

    fontSize: '14px'
};



const buttonStyle = {

    width: '100%',

    padding: '12px',

    background: '#333',

    color: '#fff',

    border: 'none',

    borderRadius: '6px',

    cursor: 'pointer',

    fontWeight: 'bold',

    fontSize: '15px'
};



export default VerifyOtp;