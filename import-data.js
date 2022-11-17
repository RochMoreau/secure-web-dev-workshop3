const mongoose = require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.MONGO_URI).then(() => console.log("Bien connecté")).catch((err) => console.log(Error))

const filmSchema = new mongoose.Schema({
    filmType: String,
    filmProducerName: String,
    endDate: Date,
    filmName: String,
    district: Number,
    geolocation: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      },
    sourceLocationId: String,
    filmDirectorName: String,
    address: String,
    startDate: Date,
    year: Number,
})

const filmingLocations = require('./lieux-de-tournage-a-paris.json')
const Location = mongoose.model('locations', filmSchema)

console.log("debut")
for (let i of filmingLocations)
{
    var object = {
        filmType: i.fields.type_tournage,
        filmProducerName: i.fields.nom_producteur,
        endDate: i.fields.date_fin,
        filmName: i.fields.nom_tournage,
        district: i.fields.ardt_lieu,
        geolocation: {
            type: i.fields.geo_shape.type,
            coordinates: i.fields.geo_shape.coordinates,
            
        },
        sourceLocationId : i.recordid,
        filmDirectorName : i.fields.nom_realisateur,
        address : i.fields.adresse_lieu,
        startDate : i.fields.date_debut,
        year : i.fields.annee_tournage
      };
    //console.log(object)
    Location.create(object)
}
  console.log("fini")