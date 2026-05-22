import { useState } from 'react';

import API from '../services/api';

function TodoList({ todos, fetchTodos }) {

    const [editingId, setEditingId] = useState(null);

    const [message, setMessage] = useState('');

    const [error, setError] = useState('');

    const [editData, setEditData] = useState({
        title: '',
        description: ''
    });




    // CLEAR MESSAGES
    const clearMessages = () => {

        setMessage('');
        setError('');
    };




    // DELETE TODO
    const deleteTodo = async (id) => {

        clearMessages();

        const confirmDelete = window.confirm(
            'Are you sure you want to delete this todo?'
        );

        if (!confirmDelete) return;

        try {

            await API.delete(
                `/todo/delete/${id}`
            );

            setMessage('Todo deleted successfully');

            fetchTodos();

        } catch (error) {

            setError(
                error?.response?.data?.message ||
                'Failed to delete todo'
            );
        }
    };




    // MARK AS COMPLETED
    const markCompleted = async (id) => {

        clearMessages();

        const confirmDone = window.confirm(
            'Mark this todo as completed?'
        );

        if (!confirmDone) return;

        try {

            await API.put(
                `/todo/update/${id}`,
                {
                    status: 'completed'
                }
            );

            setMessage('Todo marked as completed');

            fetchTodos();

        } catch (error) {

            setError(
                error?.response?.data?.message ||
                'Failed to update todo'
            );
        }
    };




    // START EDITING
    const startEditing = (todo) => {

        clearMessages();

        setEditingId(todo._id);

        setEditData({
            title: todo.title,
            description: todo.description
        });
    };




    // CANCEL EDITING
    const cancelEdit = () => {

        setEditingId(null);

        setEditData({
            title: '',
            description: ''
        });

        clearMessages();
    };




    // SAVE EDIT
    const saveEdit = async (id) => {

        clearMessages();




        // VALIDATION
        if (!editData.title.trim()) {

            return setError(
                'Title cannot be empty'
            );
        }

        if (!editData.description.trim()) {

            return setError(
                'Description cannot be empty'
            );
        }

        try {

            await API.put(
                `/todo/update/${id}`,
                editData
            );

            setMessage('Todo updated successfully');

            setEditingId(null);

            fetchTodos();

        } catch (error) {

            setError(
                error?.response?.data?.message ||
                'Failed to update todo'
            );
        }
    };




    return (

        <div>

            <h2 style={{
                marginBottom: '20px',
                color: '#333'
            }}>
                My Todos
            </h2>




            {/* SUCCESS MESSAGE */}
            {
                message && (

                    <div style={{
                        background: '#eafaf1',
                        color: '#27ae60',
                        padding: '10px',
                        borderRadius: '6px',
                        marginBottom: '15px'
                    }}>
                        {message}
                    </div>
                )
            }




            {/* ERROR MESSAGE */}
            {
                error && (

                    <div style={{
                        background: '#ffe5e5',
                        color: '#d8000c',
                        padding: '10px',
                        borderRadius: '6px',
                        marginBottom: '15px'
                    }}>
                        {error}
                    </div>
                )
            }




            {
                todos?.map((todo) => (

                    <div
                        key={todo._id}
                        style={{
                            border: '1px solid #ddd',
                            borderRadius: '10px',
                            marginBottom: '15px',
                            padding: '15px',
                            background: '#fff',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
                        }}
                    >

                        {
                            editingId === todo._id ? (

                                <div>

                                    <input
                                        type="text"
                                        value={editData.title}
                                        onChange={(e) =>
                                            setEditData({
                                                ...editData,
                                                title: e.target.value
                                            })
                                        }
                                        style={inputStyle}
                                    />

                                    <textarea
                                        value={editData.description}
                                        onChange={(e) =>
                                            setEditData({
                                                ...editData,
                                                description: e.target.value
                                            })
                                        }
                                        style={textareaStyle}
                                    />




                                    {/* ACTION BUTTONS */}
                                    <div style={{
                                        display: 'flex',
                                        gap: '10px'
                                    }}>

                                        <button
                                            onClick={() =>
                                                saveEdit(todo._id)
                                            }
                                            style={saveBtn}
                                        >
                                            Save
                                        </button>

                                        <button
                                            onClick={cancelEdit}
                                            style={cancelBtn}
                                        >
                                            Cancel
                                        </button>

                                    </div>

                                </div>

                            ) : (

                                <div>

                                    <h3 style={{
                                        marginBottom: '8px'
                                    }}>
                                        {todo.title}
                                    </h3>

                                    <p style={{
                                        color: '#555'
                                    }}>
                                        {todo.description}
                                    </p>

                                    <p>
                                        Status:
                                        {' '}
                                        <b>
                                            {todo.status}
                                        </b>
                                    </p>




                                    {/* DONE BUTTON */}
                                    {
                                        todo.status === 'completed' ? (

                                            <button
                                                disabled
                                                style={completedBtn}
                                            >
                                                Completed
                                            </button>

                                        ) : (

                                            <button
                                                onClick={() =>
                                                    markCompleted(todo._id)
                                                }
                                                style={doneBtn}
                                            >
                                                Done
                                            </button>
                                        )
                                    }

                                    {' '}




                                    {/* EDIT BUTTON */}
                                    {
                                        todo.status !== 'completed' && (

                                            <button
                                                onClick={() =>
                                                    startEditing(todo)
                                                }
                                                style={editBtn}
                                            >
                                                Edit
                                            </button>
                                        )
                                    }

                                    {' '}




                                    {/* DELETE BUTTON */}
                                    <button
                                        onClick={() =>
                                            deleteTodo(todo._id)
                                        }
                                        style={deleteBtn}
                                    >
                                        Delete
                                    </button>

                                </div>
                            )
                        }

                    </div>
                ))
            }

        </div>
    );
}




// STYLES
const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc'
};

const textareaStyle = {
    width: '100%',
    minHeight: '100px',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    resize: 'none'
};

const saveBtn = {
    background: '#333',
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '6px',
    cursor: 'pointer'
};

const cancelBtn = {
    background: '#95a5a6',
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '6px',
    cursor: 'pointer'
};

const doneBtn = {
    background: '#27ae60',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '6px',
    cursor: 'pointer'
};

const completedBtn = {
    background: '#95a5a6',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '6px'
};

const editBtn = {
    background: '#2980b9',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '6px',
    cursor: 'pointer'
};

const deleteBtn = {
    background: '#e74c3c',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '6px',
    cursor: 'pointer'
};

export default TodoList;
