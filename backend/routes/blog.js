const router = require('express').Router()
const { protect, admin } = require('../middleware/auth')
const {
	allPost,
	singlePost,
	allPostAdmin,
} = require('../controllers/blogController')

router.route('/').get(allPost)
router.route('/admin').get(protect, admin, allPostAdmin)

router.route('/:id').get(singlePost)

module.exports = router
