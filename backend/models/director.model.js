const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const directorSchema = new Schema({
    directorname: {type: String, required: true},
    description: {type: String},
},{
    timestamps:true,
});

const Director = mongoose.model('Director', directorSchema);

module.exports = Director;