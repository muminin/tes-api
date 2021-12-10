const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createUserSchema, updateUserSchema, validateLogin } = require('../middleware/validators/userValidator.middleware');

// localhost:3000/api/v1/users
router.get('/', auth(), awaitHandlerFactory(userController.getAllUsers));
// localhost:3000/api/v1/users/id/1
router.get('/id/:id', auth(), awaitHandlerFactory(userController.getUserById));
// localhost:3000/api/v1/users/username/julia
router.get('/username/:username', auth(), awaitHandlerFactory(userController.getUserByUserName));
// localhost:3000/api/v1/users/whoami
router.get('/whoami', auth(), awaitHandlerFactory(userController.getCurrentUser));
// localhost:3000/api/v1/users
router.post('/', createUserSchema, awaitHandlerFactory(userController.createUser));
// localhost:3000/api/v1/users/id/1 , using patch for partial update
router.patch('/id/:id', auth(Role.Admin), updateUserSchema, awaitHandlerFactory(userController.updateUser));
// localhost:3000/api/v1/users/id/1
router.delete('/id/:id', auth(Role.Admin), awaitHandlerFactory(userController.deleteUser));

// localhost:3000/api/v1/users/login
router.post('/login', validateLogin, awaitHandlerFactory(userController.userLogin));

module.exports = router;
