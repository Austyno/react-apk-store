const router = require('express').Router()
const { protect, authorize } = require('../middleware/auth')
const {
	addCategory,
	deleteCategory,
	updateCategory,
	getCategories,
} = require('../controllers/category')

router
	.route('/')
	.get(protect, authorize, getCategories)
	.post(protect, authorize, addCategory)

router
	.route('/:id')
	.put(protect, authorize, updateCategory)
	.delete(protect, authorize, deleteCategory)

module.exports = router
