import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Navbar() {

    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    let role = null;




    // DECODE TOKEN
    if (token) {
        try {
            const decoded = jwtDecode(token);
            role = decoded.role;
        } catch (err) {
            localStorage.removeItem('token');
        }
    }




    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };




    return (

        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '15px 30px',
            backgroundColor: '#fff',
            borderBottom: '1px solid #ddd',
            fontFamily: 'Arial, sans-serif'
        }}>

            {/* LEFT SIDE - BRAND */}
            <div style={{ fontWeight: 'bold', fontSize: '18px' }}>
                TodoApp
            </div>




            {/* CENTER LINKS */}
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>

                {
                    token && role === 'user' && (
                        <>
                            <Link style={linkStyle} to="/dashboard">
                                Dashboard
                            </Link>

                            <Link style={linkStyle} to="/profile">
                                Profile
                            </Link>
                        </>
                    )
                }




                {
                    token && role === 'admin' && (
                        <Link style={linkStyle} to="/admin">
                            Admin Dashboard
                        </Link>
                    )
                }

            </div>




            {/* RIGHT SIDE - AUTH */}
            <div>

                {
                    token ? (

                        <button
                            onClick={logout}
                            style={logoutBtn}
                        >
                            Logout
                        </button>

                    ) : (

                        <div style={{ display: 'flex', gap: '10px' }}>

                            <Link style={linkStyle} to="/login">
                                Login
                            </Link>

                            <Link style={linkStyle} to="/register">
                                Register
                            </Link>

                        </div>
                    )
                }

            </div>

        </nav>
    );
}




// STYLES (keeps code clean)
const linkStyle = {
    textDecoration: 'none',
    color: '#333',
    fontWeight: '500'
};

const logoutBtn = {
    background: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '6px',
    cursor: 'pointer'
};

export default Navbar;