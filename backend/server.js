const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

 
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open' ,() =>{
    console.log("MongoDB database connection is established successfully");
});

const movieRouter = require('./routes/movies');
const directorRouter = require('./routes/directors');


app.use('/movie', movieRouter);
app.use('/director', directorRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


