const express = require('express')
const locationController = require('./locations/locations.controller')
const app = express()
const port = 3000
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI).then(()=> {console.log('Connected !')});

app.use(locationController)

app.listen(port, () => {
	console.log(`API listening on port ${port}, visit http://localhost:${port}/`)
})

app.get('/yolegangcaditquoi', (req, res) => {
    res.send('Hello World!')
  })