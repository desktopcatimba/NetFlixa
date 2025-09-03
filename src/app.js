const express = require('express')
const app = express()
const morgan = require('morgan')
const router = require('./routers/filmeRouters')

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/',router)

module.exports = app