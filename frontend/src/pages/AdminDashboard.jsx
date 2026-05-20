import { useEffect, useState } from 'react';
import API from '../services/api';
import { jwtDecode } from 'jwt-decode';

function AdminDashboard() {

    const [users, setUsers] = useState([]);
    const [todos, setTodos] = useState([]);




    // GET CURRENT ADMIN ID
    const token = localStorage.getItem('token');

    let currentUserId = null;

    if (token) {
        try {
            const decoded = jwtDecode(token);
            currentUserId = decoded.id;
        } catch (err) {
            localStorage.removeItem('token');
        }
    }




    // FETCH USERS
    const fetchUsers = async () => {

        try {
            const res = await API.get('/admin/users');
            setUsers(res.data.users);

        } catch (error) {
            alert(error?.response?.data?.message || error.message);
        }
    };




    // FETCH TODOS
    const fetchTodos = async () => {

        try {
            const res = await API.get('/admin/todos');
            setTodos(res.data.todos);

        } catch (error) {
            alert(error?.response?.data?.message || error.message);
        }
    };




    // DELETE USER
    const deleteUser = async (id) => {

        const ok = window.confirm('Are you sure you want to delete this user?');
        if (!ok) return;

        try {
            await API.delete(`/admin/user/${id}`);

            alert('User deleted successfully');
            fetchUsers();

        } catch (error) {
            alert(error?.response?.data?.message || error.message);
        }
    };




    // DELETE TODO
    const deleteTodo = async (id) => {

        const ok = window.confirm('Are you sure you want to delete this todo?');
        if (!ok) return;

        try {
            await API.delete(`/admin/todo/${id}`);

            alert('Todo deleted successfully');
            fetchTodos();

        } catch (error) {
            alert(error?.response?.data?.message || error.message);
        }
    };




    // CHANGE ROLE
    const changeRole = async (id, currentRole) => {

        const newRole = currentRole === 'admin' ? 'user' : 'admin';

        const ok = window.confirm(`Change role to "${newRole}"?`);
        if (!ok) return;

        try {
            await API.put(`/admin/user/role/${id}`, {
                role: newRole
            });

            alert('User role updated successfully');
            fetchUsers();

        } catch (error) {
            alert(error?.response?.data?.message || error.message);
        }
    };




    useEffect(() => {
        fetchUsers();
        fetchTodos();
    }, []);




    return (

        <div style={{
            padding: '25px',
            fontFamily: 'Arial, sans-serif',
            background: '#f5f6fa',
            minHeight: '100vh'
        }}>

            {/* HEADER */}
            <h1 style={{
                textAlign: 'center',
                marginBottom: '30px',
                color: '#333'
            }}>
                Admin Dashboard
            </h1>




            {/* USERS SECTION */}
            <section style={{ marginBottom: '50px' }}>

                <h2 style={{
                    borderBottom: '2px solid #333',
                    paddingBottom: '10px'
                }}>
                    Users Management
                </h2>




                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '15px',
                    marginTop: '15px'
                }}>

                    {users.map(user => (

                        <div key={user._id} style={{
                            background: '#fff',
                            padding: '15px',
                            borderRadius: '10px',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                        }}>

                            <h3>{user.name}</h3>

                            <p>{user.email}</p>

                            <p style={{
                                fontWeight: 'bold',
                                color: user.role === 'admin' ? 'green' : 'gray'
                            }}>
                                Role: {user.role}
                            </p>




                            {/* SELF CHECK */}
                            {user._id === currentUserId ? (

                                <button
                                    disabled
                                    style={{
                                        marginTop: '10px',
                                        background: '#3498db',
                                        color: 'white',
                                        border: 'none',
                                        padding: '7px 10px',
                                        borderRadius: '5px',
                                        cursor: 'not-allowed',
                                        opacity: 0.8
                                    }}
                                >
                                    My Profile (Admin)
                                </button>

                            ) : (

                                <>
                                    {/* ROLE CHANGE */}
                                    <button
                                        onClick={() => changeRole(user._id, user.role)}
                                        style={{
                                            marginTop: '10px',
                                            background: user.role === 'admin' ? '#e67e22' : '#2ecc71',
                                            color: 'white',
                                            border: 'none',
                                            padding: '7px 10px',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            marginRight: '8px'
                                        }}
                                    >
                                        {user.role === 'admin'
                                            ? 'Demote to User'
                                            : 'Make Admin'}
                                    </button>




                                    {/* DELETE USER */}
                                    {user.role !== 'admin' && (

                                        <button
                                            onClick={() => deleteUser(user._id)}
                                            style={{
                                                marginTop: '10px',
                                                background: 'red',
                                                color: 'white',
                                                border: 'none',
                                                padding: '7px 10px',
                                                borderRadius: '5px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Delete User
                                        </button>

                                    )}
                                </>

                            )}

                        </div>

                    ))}

                </div>

            </section>






            {/* TODOS SECTION */}
            <section>

                <h2 style={{
                    borderBottom: '2px solid #333',
                    paddingBottom: '10px'
                }}>
                    Todos Management
                </h2>




                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '15px',
                    marginTop: '15px'
                }}>

                    {todos.map(todo => (

                        <div key={todo._id} style={{
                            background: '#fff',
                            padding: '15px',
                            borderRadius: '10px',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                        }}>

                            <h3>{todo.title}</h3>

                            <p>Status: <b>{todo.status}</b></p>

                            <p style={{ color: '#666' }}>
                                User: {todo.user?.name || 'Unknown'}
                            </p>




                            <button
                                onClick={() => deleteTodo(todo._id)}
                                style={{
                                    marginTop: '10px',
                                    background: '#333',
                                    color: 'white',
                                    border: 'none',
                                    padding: '7px 10px',
                                    borderRadius: '5px',
                                    cursor: 'pointer'
                                }}
                            >
                                Delete Todo
                            </button>

                        </div>

                    ))}

                </div>

            </section>

        </div>
    );
}

export default AdminDashboard;