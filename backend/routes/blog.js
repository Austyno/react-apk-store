const router = require('express').Router()
const { protect, admin } = require('../middleware/auth')
const {
	allPost,
	singlePost,
	allPostAdmin,
	deletePost,
} = require('../controllers/blogController')

router.route('/:id').get(singlePost)
router.route('/admin').get(protect, admin, allPostAdmin)
router.route('/admin/:id').delete(protect, admin, deletePost)
router.route('/').get(allPost)

module.exports = router
