const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const movieSchema = new Schema({
    directorname: {type: String, required: true},
    moviename: {type: String, required: true},
    description: {type: String, required: true},
    duration: {type:Number, required:true},
    date: {type: Date },
},{
    timestamps:true,
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;