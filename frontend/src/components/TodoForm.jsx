import { useState } from 'react';

import API from '../services/api';



function TodoForm({ fetchTodos }) {

    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });



    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };



    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await API.post(
                '/todo/create',
                formData
            );

            alert('Todo created');

            setFormData({
                title: '',
                description: ''
            });

            fetchTodos();

        } catch (error) {

            alert(error.response.data.message);
        }
    };



    return (

        <form onSubmit={handleSubmit}>

            <input
                type="text"
                name="title"
                placeholder="Todo title"
                value={formData.title}
                onChange={handleChange}
            />

            <br /><br />

            <textarea
                name="description"
                placeholder="Todo description"
                value={formData.description}
                onChange={handleChange}
            />

            <br /><br />

            <button type="submit">
                Add Todo
            </button>

        </form>
    );
}

export default TodoForm;