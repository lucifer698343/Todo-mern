const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authmiddleware');

const roleMiddleware = require('../middleware/roleMiddleware');

const {
    getAllTodos,
    getAllUsers,
    deleteUser,
    deleteAnyTodo,
    updateUserRole,
    getNotifications,
    markNotificationsRead
} = require('../controllers/adminController');



// ALL ADMIN ROUTES REQUIRE LOGIN
router.use(authMiddleware);



// ALL ROUTES BELOW REQUIRE ADMIN ROLE
router.use(roleMiddleware('admin'));

//view all todos
router.get(
    '/todos',
    getAllTodos
)
// VIEW ALL USERS
router.get(
    '/users',
    getAllUsers
);



// DELETE USER PROFILE
router.delete(
    '/user/:id',
    deleteUser
);



// DELETE ANY USER TODO
router.delete(
    '/todo/:id',
    deleteAnyTodo
);

//change user role to admin
router.put('/user/role/:id', 
    updateUserRole);

//get notification of user activity
router.get(
    '/notifications',
    getNotifications
);

//mark all as read
router.put(
    '/notifications/read',
    markNotificationsRead
);
module.exports = router;