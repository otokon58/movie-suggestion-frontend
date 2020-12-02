const express = require('express');
const router = express.Router();

const Movie = require('../models/movie.model');

router.route('/').get((req, res) => {
    Movie.find()
    .then(movies => res.json(movies))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', (req, res) =>{
    const directorname = req.body.directorname;
    const moviename = req.body.moviename;
    const description = req.body.description;
    const duration = req.body.duration;
    const date = Date.parse(req.body.date);

    const newMovie = new Movie
    ({
        directorname,
        moviename,
        description,
        duration,
        date,
    });

    newMovie.save()
    .then(() => res.json('Movie added!'))
    .catch(err => res.status(400).json('Error: ' + err));
    
});

router.get('/:id' , (req, res) => {
    Movie.findById(req.params.id)
    .then(movie => res.json(movie))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/:id' , (req, res) => {
    Movie.findByIdAndDelete(req.params.id)
    .then(() => res.json('Movie deleted!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/update/:id',(req, res) => {
    Movie.findById(req.params.id)
    .then(movie => {
        movie.directorname = req.body.directorname;
        movie.moviename = req.body.moviename;
        movie.description = req.body.description;
        movie.duration = Number(req.body.duration);
        movie.date = Date.parse(req.body.date);
        
        movie.save()
        .then(() => res.json('Movie updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;