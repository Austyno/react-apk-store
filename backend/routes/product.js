const router = require('express').Router()
const { protect, authorize } = require('../middleware/auth')
const {
	getApks,
	getApk,
	uploadApk,
	updateApk,
	deleteApk,
	uploadImages,
} = require('../controllers/product')

router.route('/').get(getApks).post(protect, uploadApk)
router.route('/upload').post(protect, uploadImages)

router
	.route('/:id')
	.get(getApk)
	.put(protect, updateApk)
	.delete(protect, authorize, deleteApk)

module.exports = router
