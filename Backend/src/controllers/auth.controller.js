const cookieOptions = require("../config/cookie")
const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const tokenBlacklistModel = require('../models/blacklist.model')
/**
* @name registerUserControl
* @description register a new user and expects username , email and password in the req body
* @access Public
*/


// here we register the user
async function registerUserControl(req, res) {

    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Please Provide username , email and password "
        })
    }

    const isUserAlreadyExist = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if (isUserAlreadyExist) {
        return res.status(400).json({
            message: 'Account already exists with this username ,  email address and password'
        })
    }

    // created the hash for the new user
    const hash = await bcrypt.hash(password, 10)


    // creating new user user with the hash if not existed 
    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie('Token', token, cookieOptions)

    res.status(200).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            user: user.username,
            email: user.email
        }
    })

}

/**
 * @name loginUserController
 * @description login a user expects email password in the request body
 * @access Public
 * 
 */

async function loginUserController(req, res) {

    const { email, password } = req.body

    const user = await userModel.findOne({ email })


    if (!user) {
        return res.status(401).json({
            message: "Invalid email and password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid email and password "
        })
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie('Token', token, cookieOptions)
    res.status(200).json({
        message: "LoggedIn successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}


/**
 * @name logoutUserController
 * @description create token from user cookie and add the token in blacklist
 * @access Public
 */


async function logoutUserController(req, res) {
    const token = req.cookies.Token

    if (token) {
        await tokenBlacklistModel.create({ token })
    }

    res.clearCookie("Token", cookieOptions)

    res.status(200).json({
        message: "User logged out successfully!"
    })
}



/**
 * @name getMeController
 * @description get the current logged in user details 
 * @access private
 */

async function getMeController(req, res) {
    const user = await userModel.findById(req.user.id).select('-password')

    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json({
        message: "User details fetched successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

module.exports = {
    registerUserControl,
    loginUserController,
    logoutUserController,
    getMeController
}