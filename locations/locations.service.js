// This file holds the Business-Logic layer, interacting with Data Layer

const Location = require('./locations.model')

async function getAll (req, res) {
	let result = await Location.find();
	res.send(result);
}

async function getById(req, res) {
	//res.send('Hello World!eee')
	//console.log(Location.find({ recordid: req.params.id }))
    let result = await Location.findOne({ _id: req.params.id });
    res.send(result);
}

async function deleteById(req, res) {
    await model.deleteOne({ _id: params.id });
    res.send("id: " + params.id + " a bien été supprimé");
}

async function create(req, res) {
    let obj = req.body;
    Location.create(obj);
    res.send("Objet ajouté");
}

async function update(req, res) {
    let obj = req.body;
    const location = await Location.findOneAndUpdate(req.params.id, obj, {new:true});
	res.send(location);
}

async function getByFilmName(req,res) {
    //console.log("POURQUOI CA MARCHE PAS")
    let result = await Location.find(({ filmName: req.params.filmname}));
    res.send(result);
}

module.exports = {getByFilmName, getAll, getById, deleteById, create, update}