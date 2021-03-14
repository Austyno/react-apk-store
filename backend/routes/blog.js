const router = require('express').Router()
const { protect, admin } = require('../middleware/auth')
const {
	addPost,
	allPost,
	singlePost,
	allPostAdmin,
	editPost,
	updatePost,
} = require('../controllers/blogController')

router.route('/').get(allPost).post(protect, admin, addPost)
router.route('/admin').get(protect, admin, allPostAdmin)

router.route('/:id').get(singlePost)
router
	.route('/:id/edit')
	.get(protect, admin, editPost)
	.put(protect, admin, updatePost)

module.exports = router
