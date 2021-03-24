const router = require('express').Router()
const { protect, admin } = require('../middleware/auth')
const { getSliders } = require('../controllers/slider')

router.route('/').get(protect, admin, getSliders)

module.exports = router
