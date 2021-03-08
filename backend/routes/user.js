const express = require('express')
const router = express.Router()
const { protect, admin } = require('../middleware/auth')

const {
	register,
	login,
	forgotPassword,
	resetPassword,
	allUsers,
	changeRole,
	deleteUser,
} = require('../controllers/user')

router.post('/register', register)
router.post('/login', login)
router.post('/forgotpassword', forgotPassword)
router.put('/resetpassword/:resettoken', resetPassword)

router.route('/').get(protect, admin, allUsers)

router.route('/:id/changerole').put(protect, admin, changeRole)

router.route('/:id').delete(protect, admin, deleteUser)

module.exports = router
