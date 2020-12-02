const express = require('express');
const router = express.Router();

let Director = require('../models/director.model');

router.get('/', (req, res) => {
    Director.find()
    .then(directors => res.json(directors))
    .catch(err => res.status(400).json('Error' + err));
});

router.post('/add', (req, res) => {
    const directorname = req.body.directorname;
    const description = req.body.description;

    const newDirector = new Director({
        directorname,
        description
    });
    

    newDirector.save()
        .then(() => res.json('Director added!'))
        .catch(err => res.status(400).json('Error: ' + err));
                    
    
});

router.get('/:id' , (req, res) => {
    Director.findById(req.params.id)
    .then(director => res.json(director))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/:id' , (req, res) => {
    Director.findByIdAndDelete(req.params.id)
    .then(() => res.json('Director deleted!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/update/:id',(req, res) => {
    Director.findById(req.params.id)
    .then(director => {
        director.directorname = req.body.directorname;
        director.description = req.body.description;

        director.save()
        .then(() => res.json('Director updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;