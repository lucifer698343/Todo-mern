const express = require('express');

const router = express.Router();

const { body } = require('express-validator');

const middleware=require('../middleware/authmiddleware')

const asyncHandler = require('express-async-handler');

const Todo = require('../models/todo');

const {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo
} = require('../controllers/todoController');

router.use(middleware);
//create TODOS
router.post(
    '/create',
    [
        body('title')
        .notEmpty().withMessage('Title is required'),

        body('description')
        .notEmpty().withMessage('Description is required')
    ],

    createTodo
);

// GET TODOS
router.get(
    '/mytodos',
    getTodos
);

// UPDATE TODO
router.put(
    '/update/:id',
    updateTodo
);

// DELETE TODO
router.delete(
    '/delete/:id',  
    deleteTodo
);



module.exports = router;