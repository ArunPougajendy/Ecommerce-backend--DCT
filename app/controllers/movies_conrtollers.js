const express = require('express');
const router = express.Router();
const { Movie } = require('../models/movie');

router.get('/',(req,res) => {
    res.send(Movie.all());
});

router.get('/:id',(req,res) => {
    let id = req.params.id;
    let movie = Movie.findById(id);
    if(movie) {
        res.send(movie);
    } else {
        res.send({
            notice : 'No such Movie'
        })
    }
})

module.exports = {
    movieController: router
}