var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Movie = mongoose.model('Movie');

router.get('/', function(req, res) {
  res.redirect('/movies');
});

router.get('/movies', function(req, res) {
  var movieFilter = {},
    searchExists = false;
  
  if(req.query.director) {
    movieFilter.director = req.query.director; 
    searchExists = true;
  }
 
  Movie.find(movieFilter, function(err, movies, count) {
    res.render('movies', {'movies': movies, searchExists: searchExists, director: req.query.director });
  });
});

router.get('/api/movies', function(req, res){
  var movieFilter = {};
  var searchExists = false;
  if (req.query.director) {
    movieFilter.director = req.query.director;
    searchExists= true;
  }
  if (searchExists) {
    Movie.find({director:req.query.director}, function(err, movies, count){
      res.json(movies.map(function(ele){
        return{
          'title': ele.title,
          'director': ele.director,
          'year': ele.year
        }
      }))
    })
  }
  
  else {
    Movie.find({}, function(err, movies, count){
      res.json(movies.map(function(ele){
        return{
          'title': ele.title,
          'director': ele.director,
          'year': ele.year
        }
      }))
    })
  }
});

router.post('/api/movies/create', function(req, res){
  var title=req.body.movieTitle, director=req.body.movieDirector, year=Number(req.body.movieYear);
  var tmpMovie = new Movie({title:title, director:director, year:year});
  tmpMovie.save(function(err, movie, count){
    if (err) {
      return (res.send({'error':"There was an error adding the new movie"}));
    }
    else{
      res.json(tmpMovie);
    }
  })
})

module.exports = router;
