const router = require('express').Router();
const { protect, admin } = require('../middleware/auth');
const {
	getSliders,
	createSlide,
	slideShow,
	deleteSlide,
} = require('../controllers/slider');

router
	.route('/admin')
	.get(protect, admin, getSliders)
	.post(protect, admin, createSlide);

router.route('/').get(slideShow);
router.route('/admin/:id').delete(protect, admin, deleteSlide);

module.exports = router;
