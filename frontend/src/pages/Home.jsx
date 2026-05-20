import { Link } from 'react-router-dom';

function Home() {

    return (

        <div style={{
            fontFamily: 'Arial, sans-serif',
            background: '#f5f6fa',
            minHeight: '100vh'
        }}>

            {/* HERO SECTION */}
            <section style={{
                textAlign: 'center',
                padding: '100px 20px',
                background: '#fff'
            }}>

                <h1 style={{
                    fontSize: '48px',
                    marginBottom: '20px',
                    color: '#333'
                }}>
                    Manage Your Tasks Efficiently
                </h1>

                <p style={{
                    fontSize: '18px',
                    color: '#666',
                    maxWidth: '700px',
                    margin: '0 auto 30px'
                }}>
                    A complete MERN Todo Management System with
                    authentication, admin controls, profile management,
                    and role-based access.
                </p>




                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '15px',
                    flexWrap: 'wrap'
                }}>

                    <Link to="/register">

                        <button style={primaryBtn}>
                            Get Started
                        </button>

                    </Link>




                    <Link to="/login">

                        <button style={secondaryBtn}>
                            Login
                        </button>

                    </Link>

                </div>

            </section>






            {/* FEATURES */}
            <section style={{
                padding: '60px 20px'
            }}>

                <h2 style={{
                    textAlign: 'center',
                    marginBottom: '40px',
                    color: '#333'
                }}>
                    Features
                </h2>




                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '20px',
                    maxWidth: '1100px',
                    margin: '0 auto'
                }}>

                    <div style={featureCard}>
                        <h3>Authentication</h3>
                        <p>
                            Secure JWT authentication with login and registration system.
                        </p>
                    </div>

                    <div style={featureCard}>
                        <h3>Todo Management</h3>
                        <p>
                            Create, update, delete, and manage todos efficiently.
                        </p>
                    </div>

                    <div style={featureCard}>
                        <h3>Admin Dashboard</h3>
                        <p>
                            Manage users, todos, and roles with admin controls.
                        </p>
                    </div>

                    <div style={featureCard}>
                        <h3>Profile System</h3>
                        <p>
                            Upload profile image and manage account information.
                        </p>
                    </div>

                </div>

            </section>






            {/* FOOTER */}
            <footer style={{
                textAlign: 'center',
                padding: '20px',
                background: '#fff',
                borderTop: '1px solid #ddd',
                color: '#666'
            }}>

                <p>
                    MERN Todo App © 2026
                </p>

            </footer>

        </div>
    );
}




// STYLES
const primaryBtn = {
    background: '#333',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold'
};

const secondaryBtn = {
    background: '#fff',
    color: '#333',
    border: '1px solid #333',
    padding: '12px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold'
};

const featureCard = {
    background: '#fff',
    padding: '25px',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    textAlign: 'center'
};

export default Home;