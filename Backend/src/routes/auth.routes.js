const { Router } = require('express')

const authRouter = Router()

const authController = require('../controllers/auth.controller')
const authMiddleware = require('../middlewares/auth.middleware')
/**
 * @route POST api/auth/register
 * @description register a new user
 * @access Public
 */

authRouter.post("/register", authController.registerUserControl)

/**
 * @routes POST /api/auth/login
 * @description login user with email and password 
 * @access Public
 */
authRouter.post("/login", authController.loginUserController)

/**
 * @routes GET /api/auth/logout
 * @description clear token from user cookie and add token in the blacklist
 * @access Public
 */

authRouter.get('/logout', authController.logoutUserController)

/**
 * @routes GET /api/auth/get-me
 * @description get the current user login details
 * @access private 
 */

authRouter.get('/get-me', authMiddleware.authUser, authController.getMeController)

module.exports = authRouter