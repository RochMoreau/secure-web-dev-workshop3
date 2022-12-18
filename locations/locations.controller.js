const router = require('express').Router()
const locationsService = require('./locations.service')
const Location = require("./locations.model")
const {addLocation} = require("./locations.service");
//const roleMiddleware = require('../middleware/auth.middleware');
require('../strategy/strategy.jwt');

router.get('/', (req, res) => {
	return res.status(200).send("Hello World")
})

router.get('/locations', async(req, res) => {
	const locations = await Location.find()
	return res.status(200).send(locations)
})

router.get('/locations/:id', async(req,res) =>{
	try{
		const location = await locationsService.findOne(req.params['id'])
		return res.status(200).send(location)
	}catch(e){
		if(e.message==="Not found"){
			return res.status(404).send(e.toString())
		}
		return res.status(500).send("Bad request")
	}
})

router.post('/locations', async (req,res, next) =>{
	try{
		const location = await locationsService.addLocation({...req.body, endDate:new Date(req.body.endDate), startDate: new Date(req.body.startDate)})
		return res.status(200).send(location)
	}catch(e) {
		return res.stat
	}
})


router.delete('/locations/:id', async (req,res)=>{
	try{
		const location = await locationsService.deleteById(req.params.id)
		return res.status(200).send(location)
	}catch(e){
		if(e.message==="Not found"){
			return res.status(404).send(e.toString())
		}
		return res.status(500).send("Bad request")
	}
})
router.put('/locations/:id', async (req,res)=>{
	try{
		const location = await locationsService.updateLocation(req.params.id, {...req.body, endDate:new Date(req.body.endDate), startDate: new Date(req.body.startDate)})
		return res.status(200).send(location)
	}catch(e){
		if(e.message==="Not found"){
			return res.status(404).send(e.toString())
		}
		return res.status(500).send("Bad request")
	}
})
module.exports = router