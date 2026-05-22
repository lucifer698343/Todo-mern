import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

import API from '../services/api';
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });




    const handleChange = (e) => {

        // CLEAR ERROR WHILE TYPING
        setErrorMessage('');

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };




    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await API.post('/auth/login', formData);

            const token = res.data.token;

            localStorage.setItem('token', token);




            // decode role safely
            const decoded = jwtDecode(token);

            if (decoded.role === 'admin') {

                navigate('/admin');

            } else {

                navigate('/dashboard');
            }

        } catch (error) {

            setErrorMessage(
                error?.response?.data?.message || 'Login failed'
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





                {/* ERROR MESSAGE */}
                {
                    errorMessage && (

                        <div style={{
                            background: '#ffe5e5',
                            color: '#d8000c',
                            padding: '10px',
                            borderRadius: '6px',
                            marginBottom: '15px',
                            textAlign: 'center',
                            fontSize: '14px'
                        }}>
                            {errorMessage}
                        </div>
                    )
                }





                <form onSubmit={handleSubmit}>

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
                        Login
                    </button>

                </form>





                {/* SIGNUP OPTION */}
                <p style={{
                    marginTop: '15px',
                    textAlign: 'center',
                    color: '#555'
                }}>
                    Don't have an account?
                    {' '}

                    <Link
                        to="/register"
                        style={{
                            color: '#333',
                            fontWeight: 'bold',
                            textDecoration: 'none'
                        }}
                    >
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

export default Login;
