const mongoose = require('mongoose')
const express = require('express')
const app = express()
require('dotenv').config();

app.use(express.urlencoded())
app.use(express.json())
const models = require('./models/blog.js')


app.use("/", (req, res) => {
    res.send('hello from here!')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Server on')
})