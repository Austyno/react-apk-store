const router = require('express').Router()
const { protect, admin } = require('../middleware/auth')
const {
	uploadProduct,
	getApks,
	getApk,
	uploadApk,
	updateApk,
	deleteApk,
	uploadImages,
	getEditorsChoice,
	allApps,
	getApprovedAndUnapprovedApps,
	approve,
} = require('../controllers/product')

router.route('/editor').get(getEditorsChoice)
router.route('/apps').get(allApps)
router.route('/admin/apps').get(protect, admin, getApprovedAndUnapprovedApps)

router.route('/').get(getApks).post(protect, admin, uploadProduct)
router.route('/upload').post(protect, uploadImages)
router.route('/uploadapk').post(protect, uploadApk)

router
	.route('/:id')
	.get(getApk)
	.put(protect, updateApk)
	.delete(protect, admin, deleteApk)

router.route('/:id/approve').put(protect, admin, approve)

module.exports = router
