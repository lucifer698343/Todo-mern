import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError('');
        setSuccess('');

        if (!email.trim()) {
            return setError('Email is required');
        }

        try {

            const res = await API.post('/auth/forgot-password', {
                email
            });

            setSuccess(res.data.message);

            // store email for next step
            localStorage.setItem('resetEmail', email);

            setTimeout(() => {
                navigate('/reset-password');
            }, 1200);

        } catch (error) {

            setError(
                error?.response?.data?.message ||
                'Something went wrong'
            );
        }
    };

    return (
        <div style={container}>
            <div style={card}>

                <h2>Forgot Password</h2>
                <p>Enter your email to receive OTP</p>

                {error && <div style={errorBox}>{error}</div>}
                {success && <div style={successBox}>{success}</div>}

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={input}
                    />

                    <button style={btn}>
                        Send OTP
                    </button>

                </form>

            </div>
        </div>
    );
}

const container = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#f5f6fa'
};

const card = {
    width: '350px',
    padding: '30px',
    background: '#fff',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
};

const input = {
    width: '100%',
    padding: '10px',
    marginBottom: '12px',
    borderRadius: '6px',
    border: '1px solid #ccc'
};

const btn = {
    width: '100%',
    padding: '10px',
    background: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
};

const errorBox = {
    background: '#ffe5e5',
    padding: '10px',
    marginBottom: '10px',
    color: '#d8000c'
};

const successBox = {
    background: '#eafaf1',
    padding: '10px',
    marginBottom: '10px',
    color: '#27ae60'
};

export default ForgotPassword;