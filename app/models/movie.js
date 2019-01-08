function Movie() {

}

Movie.data = [
    {id: 1, name: 'Avatar', genre: 'Action'},
    {id: 2, name: `Baby's Day Out`, genre: 'Comedy'}
]

Movie.all = function() {
    return Movie.data;
}

Movie.findById = function(id) {
    return Movie.data.find( movie => movie.id == id);
}

module.exports = {
    Movie
}