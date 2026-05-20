import { useState } from 'react';

import API from '../services/api';



function TodoList({ todos, fetchTodos }) {

    const [editingId, setEditingId] = useState(null);

    const [editData, setEditData] = useState({
        title: '',
        description: ''
    });




    // DELETE TODO
    const deleteTodo = async (id) => {

        const confirmDelete = window.confirm(
            'Are you sure you want to delete this todo?'
        );

        if (!confirmDelete) return;

        try {

            await API.delete(
                `/todo/delete/${id}`
            );

            alert('Todo deleted');

            fetchTodos();

        } catch (error) {

            alert(error.response.data.message);
        }
    };




    // MARK AS COMPLETED
    const markCompleted = async (id) => {

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

            alert('Todo completed');

            fetchTodos();

        } catch (error) {

            alert(error.response.data.message);
        }
    };




    // START EDITING
    const startEditing = (todo) => {

        setEditingId(todo._id);

        setEditData({
            title: todo.title,
            description: todo.description
        });
    };




    // SAVE EDIT
    const saveEdit = async (id) => {

        try {

            await API.put(
                `/todo/update/${id}`,
                editData
            );

            alert('Todo updated');

            setEditingId(null);

            fetchTodos();

        } catch (error) {

            alert(error.response.data.message);
        }
    };




    return (

        <div>

            <h2>My Todos</h2>

            {
                todos?.map((todo) => (

                    <div
                        key={todo._id}
                        style={{
                            border: '1px solid gray',
                            marginBottom: '10px',
                            padding: '10px'
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
                                    />

                                    <br /><br />

                                    <textarea
                                        value={editData.description}
                                        onChange={(e) =>
                                            setEditData({
                                                ...editData,
                                                description: e.target.value
                                            })
                                        }
                                    />

                                    <br /><br />

                                    <button
                                        onClick={() =>
                                            saveEdit(todo._id)
                                        }
                                    >
                                        Save
                                    </button>

                                </div>

                            ) : (

                                <div>

                                    <h3>{todo.title}</h3>

                                    <p>{todo.description}</p>

                                    <p>
                                        Status:
                                        {' '}
                                        {todo.status}
                                    </p>

                                    {/* DONE BUTTON */}
                                    {
                                        todo.status === 'completed' ? (

                                            <button disabled>
                                                Completed
                                            </button>

                                        ) : (

                                            <button
                                                onClick={() =>
                                                    markCompleted(todo._id)
                                                }
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

export default TodoList;