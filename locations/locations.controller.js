// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require('express').Router()
const locationsService = require('./locations.service')

router.get('/locations', (req, res) => {
	return res.status(200).send({locations: []})
})


module.exports = router
