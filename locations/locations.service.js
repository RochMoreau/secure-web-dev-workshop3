const Location = require('./locations.model')

async function findAll () {
	try {
		const response = await Location.find();
		return response;
	} catch (error) {
		console.log("location doesn't exist");
		console.log(error);
	}
}

async function findOne(id){
	const location = await Location.findById(id)
	if(!location)
		throw new Error("Not found")
	return location;
}

function addLocation(data){
	try{
		const location = new Location(data)
		location.save()
	}catch(e){
		throw new Error("Wrong data")
	}
	return location
}

function deleteByID(id){
	const location = Location.findById( {_id : id})
	if(!location)
		throw new Error("Not found")
	else
		Location.deleteOne({_id: id})
	return location
}


function updateLocation(id, update){
	const location = Location.findOne({ _id: id });
	if(!location)
		throw new Error("Not found")
	else
		Location.updateOne({_id:id})
	return location
}

module.exports.updateLocation = updateLocation;
module.exports.findOne = findOne
module.exports.findAll = findAll
module.exports.addLocation = addLocation;
module.exports.deleteById = deleteByID;