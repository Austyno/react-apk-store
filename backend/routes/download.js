const http = require('http')
const fs = require('fs')
const router = require('express').Router()
const Product = require('../models/Product')
const ErrorResponse = require('../utils/errorResponse')
const { protect } = require('../middleware/auth')

const downloadFile = (url) => {
	return new Promise((resolve, reject) => {
		let file = fs.createWriteStream('./output.apk')
		http.get(url, (netWorkRes) => {
			netWorkRes.on('data', (chunk) => {
				file.write(chunk)
			})
			netWorkRes.on('end', () => {
				resolve('file download complete')
			})
		})
	})
}

router.get('/:id', async (req, res) => {
	/**TODO: check if the file is downloaded then update the users downloaded apps with the app id */
	const id = req.params.id

	const apkFile = await Product.findById(id)

	if (!apkFile) {
		return next(new ErrorResponse('this apk does not exist', 400))
	}
	const url = apkFile.apk

	try {
		const downlodedFile = await downloadFile(url)
		res.send(downlodedFile)
	} catch (error) {
		res.send(error)
	}

	// http.get(url, (file) => {
	// 	file.pipe(res)
	// })
})

module.exports = router
