const router = require('express').Router()
const { protect, authorize } = require('../middleware/auth')
const {
	getApks,
	getApk,
	uploadApk,
	updateApk,
	deleteApk,
} = require('../controllers/product')

router.route('/').get(getApks).post(protect, uploadApk)

router
	.route('/:id')
	.get(getApk)
	.put(protect, updateApk)
	.delete(protect, authorize, deleteApk)

module.exports = router
