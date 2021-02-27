const router = require('express').Router()
const { protect, admin } = require('../middleware/auth')
const {
	getApks,
	getApk,
	uploadApk,
	updateApk,
	deleteApk,
	uploadImages,
	getEditorsChoice,
	allApps,
	getApprovedAndUnapprovedApps,
} = require('../controllers/product')

router.route('/editor').get(getEditorsChoice)
router.route('/apps').get(allApps)
router.route('/admin/apps').get(protect, admin, getApprovedAndUnapprovedApps)

router.route('/').get(getApks).post(protect, uploadApk)
router.route('/upload').post(protect, uploadImages)

router
	.route('/:id')
	.get(getApk)
	.put(protect, updateApk)
	.delete(protect, admin, deleteApk)

module.exports = router
