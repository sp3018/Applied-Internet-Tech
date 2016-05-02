var express = require('express');
var router = express.Router();

/* GET movies page. */
router.get('/', function(req, res, next) {
  Movie.find({}, function(err, movie, count){
    res.render('movies', {movie: movie});    
  });
});

module.exports = router;
