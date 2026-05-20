const Todo = require('../models/todo');
const { validationResult } = require('express-validator');
const asyncHandler=require('express-async-handler')

//creating todo
const createTodo =asyncHandler (async (req, res) => {
    const errors = validationResult(req);

if(!errors.isEmpty()){

    return res.status(400)
    throw new Error(errors.array()[0].msg);
}
   

        const { title, description } = req.body;

        const newTodo = new Todo({
            title,
            description,
            user: req.user.id
        });

        const savedTodo = await newTodo.save();

        res.status(201).json({
            message: 'Todo created successfully',
            todo: savedTodo
        });

    
})

// GET TODOS
const getTodos = asyncHandler(async (req, res) => {

    const todos = await Todo.find({
        user: req.user.id
    }).sort({ createdAt: -1 });

    res.status(200).json({
        total: todos.length,
        todos
    });
});


// UPDATE TODO
const updateTodo = asyncHandler(async (req, res) => {

    const updatedTodo = await Todo.findOneAndUpdate(
        {
            _id: req.params.id,
            user: req.user.id
        },
        {
            $set: req.body
        },
        {
            new: true
        }
    );

    if (!updatedTodo) {

        res.status(404);
        throw new Error('Todo not found');
    }

    res.status(200).json({
        message: 'Todo updated successfully',
        todo: updatedTodo
    });
});


// DELETE TODO
const deleteTodo = asyncHandler(async (req, res) => {

    const deletedTodo = await Todo.findOneAndDelete({
        _id: req.params.id,
        user: req.user.id
    });

    if (!deletedTodo) {

        res.status(404);
        throw new Error('Todo not found');
    }

    res.status(200).json({
        message: 'Todo deleted successfully'
    });
});


module.exports = {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo
};