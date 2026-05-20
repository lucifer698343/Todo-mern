const asyncHandler=require('express-async-handler')
const User=require('../models/User')
const Todo=require('../models/todo')

//get all todos
const getAllTodos = asyncHandler(async (req, res) => {

    const todos = await Todo.find()
    .populate('user', 'name email role');

    res.status(200).json({
        totalTodos: todos.length,
        todos
    });
});

//get all users
const getAllUsers=asyncHandler(async(req,res)=>{
    const users=await User.find()
    
    res.status(200).json({
        totalUsers:users.length, 
        users
    })
})
// DELETE USER
const deleteUser = asyncHandler(async (req, res) => {

    // 1. FIRST: find user
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // 2. BLOCK ADMIN BEFORE DELETE
    if (user.role === 'admin') {
        res.status(403);
        throw new Error('Admin cannot be deleted');
    }

    // 3. DELETE USER ONLY IF SAFE
    await User.findByIdAndDelete(req.params.id);

    // 4. DELETE TODOS
    await Todo.deleteMany({
        user: req.params.id
    });

    res.status(200).json({
        message: 'User and all associated todos deleted successfully'
    });
});



// DELETE ANY TODO
const deleteAnyTodo = asyncHandler(async (req, res) => {

    const deleteTodo= await Todo.findByIdAndDelete(req.params.id);

    if (!deleteTodo) {

        res.status(404);

        throw new Error('Todo not found');
    }

    res.status(200).json({
        message: 'Todo deleted by admin successfully'
    });
});

const updateUserRole = asyncHandler(async (req, res) => {

    const { role } = req.body;

    const allowedRoles = ['user', 'admin'];

    if (!allowedRoles.includes(role)) {
        res.status(400);
        throw new Error('Invalid role');
    }

    const user = await User.findByIdAndUpdate(
        req.params.id,
        { role },
        { new: true }
    );

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    res.status(200).json({
        message: 'User role updated successfully',
        user
    });
});

module.exports = {
    getAllTodos,
    getAllUsers,
    deleteUser,
    deleteAnyTodo,
    updateUserRole
};
