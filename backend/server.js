const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const fileUpload = require('express-fileupload')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
const hpp = require('hpp')
const cors = require('cors')
const connectToDb = require('./config/db')
const errorHandler = require('./middleware/error')

dotenv.config({ path: './config/config.env' })
connectToDb()

const productRoutes = require('./routes/product')
const categoryRoutes = require('./routes/category')
const userRoutes = require('./routes/user')
const reviewRoutes = require('./routes/reviews')
const downloadRoute = require('./routes/download')
const blogRoutes = require('./routes/blog')
const app = express()

// Do root password:t5cLH3Bv3Et&@fD

//file upload
app.use(fileUpload())

//enable cors
app.use(cors())

// Body parser
app.use(express.json())

app.use(mongoSanitize())

// Set security headers
app.use(helmet())

// Prevent XSS attacks
app.use(xss())

// Prevent http param pollution
app.use(hpp())

// Set static folder
// app.use(express.static(path.join(__dirname, '/public')))

app.use('/uploads', express.static(path.join(__dirname, 'uploads/')))

//mount routes here

app.use('/api/products', productRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/users', userRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/download', downloadRoute)
app.use('/api/posts', blogRoutes)

// app.get("/api/config/paypal", (req, res) =>
//   res.send(process.env.PAYPAL_CLIENT_ID)
// );

//must be below routes to work
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)

process.on('unhandledRejection', (err, promise) => {
	console.log(`Errors : ${err.message}`)
	// return errorHandler(`${err.message}`, `${err.statusCode}`)
	// server.close(()=> process.exit(1))
})
