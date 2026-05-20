import { useEffect, useState } from 'react';
import API from '../services/api';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';

function Dashboard() {

    const [todos, setTodos] = useState([]);




    const fetchTodos = async () => {

        try {

            const res = await API.get('/todo/mytodos');
            setTodos(res.data.todos);

        } catch (error) {
            alert(error?.response?.data?.message || error.message);
        }
    };




    useEffect(() => {
        fetchTodos();
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
                <h1 style={{ color: '#333' }}>User Dashboard</h1>
                <p style={{ color: '#777' }}>
                    Manage your todos efficiently
                </p>
            </div>




            {/* TODO FORM SECTION */}
            <div style={{
                background: '#fff',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                marginBottom: '20px'
            }}>

                <TodoForm fetchTodos={fetchTodos} />

            </div>




            {/* TODO LIST SECTION */}
            <div style={{
                background: '#fff',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
            }}>

                <TodoList
                    todos={todos}
                    fetchTodos={fetchTodos}
                />

            </div>

        </div>
    );
}

export default Dashboard;