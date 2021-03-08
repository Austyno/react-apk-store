const router = require('express').Router()
const { protect, admin } = require('../middleware/auth')
const {
	addCategory,
	deleteCategory,
	updateCategory,
	getCategories,
	getProducts,
	allCategoryAdmin,
	getCategory,
} = require('../controllers/category')

router.route('/').get(getCategories).post(protect, admin, addCategory)
router.route('/admin').get(protect, admin, allCategoryAdmin)
router.route('/:id/edit').get(protect, admin, getCategory)

router
	.route('/:id')
	.put(protect, admin, updateCategory)
	.delete(protect, admin, deleteCategory)
	.get(getProducts)

module.exports = router
