import { useState } from 'react';

import API from '../services/api';

function TodoForm({ fetchTodos }) {

    const [errorMessage, setErrorMessage] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        description: ''
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




        // FRONTEND VALIDATION
        if (!formData.title.trim()) {

            return setErrorMessage(
                'Title cannot be empty'
            );
        }

        if (!formData.description.trim()) {

            return setErrorMessage(
                'Description cannot be empty'
            );
        }




        try {

            await API.post(
                '/todo/create',
                formData
            );

            // CLEAR ERROR AFTER SUCCESS
            setErrorMessage('');

            setFormData({
                title: '',
                description: ''
            });

            fetchTodos();

        } catch (error) {

            setErrorMessage(
                error?.response?.data?.message ||
                'Failed to create todo'
            );
        }
    };




    return (

        <form
            onSubmit={handleSubmit}
            style={{
                background: '#fff',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                marginBottom: '20px'
            }}
        >

            <h2 style={{
                marginBottom: '15px',
                color: '#333'
            }}>
                Create Todo
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
                        fontSize: '14px'
                    }}>
                        {errorMessage}
                    </div>
                )
            }





            {/* TITLE */}
            <input
                type="text"
                name="title"
                placeholder="Todo title"
                value={formData.title}
                onChange={handleChange}
                style={inputStyle}
            />




            {/* DESCRIPTION */}
            <textarea
                name="description"
                placeholder="Todo description"
                value={formData.description}
                onChange={handleChange}
                style={textareaStyle}
            />




            {/* BUTTON */}
            <button
                type="submit"
                style={buttonStyle}
            >
                Add Todo
            </button>

        </form>
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

const textareaStyle = {
    width: '100%',
    padding: '10px',
    minHeight: '100px',
    marginBottom: '12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    outline: 'none',
    resize: 'none'
};

const buttonStyle = {
    background: '#333',
    color: '#fff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold'
};

export default TodoForm;
