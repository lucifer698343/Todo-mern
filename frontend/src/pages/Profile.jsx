import { useEffect, useState } from 'react';
import API from '../services/api';

function Profile() {

    const [user, setUser] = useState(null);

    const [image, setImage] = useState(null);

    const [error, setError] = useState('');

    const [success, setSuccess] = useState('');




    // FETCH PROFILE
    const fetchProfile = async () => {

        try {

            const res = await API.get('/auth/Myprofile');

            setUser(res.data);

        } catch (error) {

            setError(
                error?.response?.data?.message || error.message
            );
        }
    };




    // UPLOAD IMAGE
    const uploadImage = async (e) => {

        e.preventDefault();

        setError('');
        setSuccess('');




        // VALIDATION
        if (!image) {

            setError('Please select an image first');

            return;
        }

        const formData = new FormData();

        formData.append('profileImage', image);




        try {

            await API.put(
                '/auth/upload-profile',
                formData
            );

            setSuccess('Profile image uploaded successfully');

            setImage(null);

            fetchProfile();

        } catch (error) {

            setError(
                error?.response?.data?.message || error.message
            );
        }
    };




    useEffect(() => {

        fetchProfile();

    }, []);




    return (

        <div style={{
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f5f6fa',
            minHeight: '100vh'
        }}>

            {/* HEADER */}
            <div style={{
                textAlign: 'center',
                marginBottom: '30px'
            }}>

                <h1 style={{ color: '#333' }}>
                    User Profile
                </h1>

                <p style={{ color: '#777' }}>
                    Manage your personal information
                </p>

            </div>




            {/* ERROR MESSAGE */}
            {
                error && (

                    <div style={{
                        maxWidth: '500px',
                        margin: '0 auto 20px',
                        background: '#ffe6e6',
                        color: '#d63031',
                        padding: '12px',
                        borderRadius: '8px',
                        textAlign: 'center',
                        border: '1px solid #ff7675'
                    }}>
                        {error}
                    </div>
                )
            }




            {/* SUCCESS MESSAGE */}
            {
                success && (

                    <div style={{
                        maxWidth: '500px',
                        margin: '0 auto 20px',
                        background: '#eafaf1',
                        color: '#27ae60',
                        padding: '12px',
                        borderRadius: '8px',
                        textAlign: 'center',
                        border: '1px solid #2ecc71'
                    }}>
                        {success}
                    </div>
                )
            }




            {/* PROFILE CARD */}
            {
                user && (

                    <div style={{
                        maxWidth: '500px',
                        margin: '0 auto',
                        background: '#fff',
                        padding: '25px',
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        textAlign: 'center'
                    }}>

                        {/* PROFILE IMAGE */}
                        <div style={{ marginBottom: '20px' }}>

                            {
                                user.details.Image ? (

                                    <img
                                        src={`https://todo-mern-zcmm.onrender.com${user.details.Image}`}
                                        alt="profile"
                                        style={{
                                            width: '120px',
                                            height: '120px',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            border: '3px solid #ddd'
                                        }}
                                    />

                                ) : (

                                    <div style={{
                                        width: '120px',
                                        height: '120px',
                                        borderRadius: '50%',
                                        background: '#ddd',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto',
                                        color: '#666'
                                    }}>
                                        No Image
                                    </div>

                                )
                            }

                        </div>




                        {/* USER INFO */}
                        <h2 style={{ marginBottom: '5px' }}>
                            {user.details.Name}
                        </h2>

                        <p style={{
                            color: '#666',
                            marginBottom: '5px'
                        }}>
                            {user.details.Email}
                        </p>

                        <p style={{
                            fontWeight: 'bold',
                            color:
                                user.details.Role === 'admin'
                                    ? 'green'
                                    : '#333',
                            marginBottom: '20px'
                        }}>
                            Role: {user.details.Role}
                        </p>




                        {/* IMAGE UPLOAD */}
                        <form onSubmit={uploadImage}>

                            <input
                                type="file"
                                onChange={(e) =>
                                    setImage(e.target.files[0])
                                }
                                style={{
                                    marginBottom: '10px'
                                }}
                            />

                            <br />

                            <button
                                type="submit"
                                style={{
                                    background: '#333',
                                    color: 'white',
                                    border: 'none',
                                    padding: '10px 15px',
                                    borderRadius: '6px',
                                    cursor: 'pointer'
                                }}
                            >
                                Upload Image
                            </button>

                        </form>

                    </div>

                )
            }

        </div>
    );
}

export default Profile;
