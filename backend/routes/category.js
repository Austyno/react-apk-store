const router = require('express').Router()
const { protect, authorize } = require('../middleware/auth')
const {
	addCategory,
	deleteCategory,
	updateCategory,
	getCategories,
	getProducts,
} = require('../controllers/category')

router
	.route('/')
	.get(protect, authorize, getCategories)
	.post(protect, authorize, addCategory)

router
	.route('/:id')
	.put(protect, authorize, updateCategory)
	.delete(protect, authorize, deleteCategory)
	.get(getProducts)

module.exports = router
