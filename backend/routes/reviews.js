const router = require('express').Router()
const { protect, admin } = require('../middleware/auth')
const { addReviews, getReviews } = require('../controllers/reviews')

router.route('/:id').post(protect, addReviews).get(getReviews)

module.exports = router
