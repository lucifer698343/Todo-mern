import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
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

        // FRONTEND VALIDATION
        if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
            return setError('All fields are required');
        }

        if (formData.password.length < 6) {
            return setError('Password must be at least 6 characters');
        }

        try {

            await API.post('/auth/Registration', formData);

            setSuccess('Registration successful! Redirecting...');

            setTimeout(() => {
                navigate('/login');
            }, 1200);

        } catch (error) {

            setError(
                error?.response?.data?.message ||
                'Registration failed'
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
                    Create Account
                </h2>




                {/* ERROR MESSAGE */}
                {error && (
                    <div style={{
                        background: '#ffe5e5',
                        color: '#d8000c',
                        padding: '10px',
                        borderRadius: '6px',
                        marginBottom: '12px',
                        fontSize: '14px'
                    }}>
                        {error}
                    </div>
                )}




                {/* SUCCESS MESSAGE */}
                {success && (
                    <div style={{
                        background: '#eafaf1',
                        color: '#27ae60',
                        padding: '10px',
                        borderRadius: '6px',
                        marginBottom: '12px',
                        fontSize: '14px'
                    }}>
                        {success}
                    </div>
                )}




                <form onSubmit={handleSubmit}>

                    {/* NAME */}
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        onChange={handleChange}
                        style={inputStyle}
                    />

                    {/* EMAIL */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        onChange={handleChange}
                        style={inputStyle}
                    />

                    {/* PASSWORD */}
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
                        Register
                    </button>

                </form>

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

export default Register;
