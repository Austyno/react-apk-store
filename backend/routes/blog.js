const router = require('express').Router()
const { allPost, singlePost } = require('../controllers/blogController')

router.route('/').get(allPost)

router.route('/:id').get(singlePost)

module.exports = router
