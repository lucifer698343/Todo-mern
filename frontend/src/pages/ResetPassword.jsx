import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {

    const navigate = useNavigate();

    const email = localStorage.getItem('resetEmail') || '';

    const [formData, setFormData] = useState({
        otp: '',
        newPassword: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError('');
        setSuccess('');

        if (!formData.otp || !formData.newPassword) {
            return setError('All fields are required');
        }

        if (formData.newPassword.length < 6) {
            return setError('Password must be at least 6 characters');
        }

        try {

            const res = await API.post('/auth/reset-password', {
                email,
                otp: formData.otp,
                newPassword: formData.newPassword
            });

            setSuccess(res.data.message);

            localStorage.removeItem('resetEmail');

            setTimeout(() => {
                navigate('/login');
            }, 1500);

        } catch (error) {

            setError(
                error?.response?.data?.message ||
                'Reset failed'
            );
        }
    };

    return (
        <div style={container}>
            <div style={card}>

                <h2>Reset Password</h2>
                <p>Email: {email}</p>

                {error && <div style={errorBox}>{error}</div>}
                {success && <div style={successBox}>{success}</div>}

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="otp"
                        placeholder="Enter OTP"
                        onChange={handleChange}
                        style={input}
                    />

                    <input
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                        onChange={handleChange}
                        style={input}
                    />

                    <button style={btn}>
                        Reset Password
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

export default ResetPassword;