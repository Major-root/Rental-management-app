const express = require('express')
const appRouter = require('./router')
const AppError = require('./src/utils/appError')
const errorHandler = require('./src/controllers/error/error')
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

appRouter(app)

app.use('*', (req, res, next) => {
    next(new AppError(`${req.originalUrl} is not found in my server`, 400))
    // res.status(400).json({
    //     message: "url not found in my server"
    // })
})

app.use(errorHandler)

module.exports = app