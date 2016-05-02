var express = require('express');
var router = express.Router();

require('./../db');
var mongoose = require('mongoose');
var Image = mongoose.model('Image');
var ImagePost = mongoose.model('ImagePost');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/image-posts', function(req, res, next) {
  ImagePost.find(function(err, posts, count){
  	res.render('image-posts', {posts:posts});
  });	
});

router.post('/process-post', function(req, res, next) {
  var tempPost=new ImagePost({title: req.body['title']});
  for(var i=0; i<2; i++){
  	var tempUrl= req.body['url' + (i+1)];
  	var tempCaption= req.body['caption'+ (i+1)];
  	if(tempUrl !== ""){
  		var tempImg = new Image({caption:tempCaption, url:tempUrl});
  		tempPost.images.push(tempImg);
  	} 
  }
  if(tempPost.images.length > 0){
  	tempPost.save(function(err, tempPost, count){
  		console.log('Nice');
  	});
  }
  res.redirect('/image-posts');
});

router.get('/image-post/:slug', function(req, res, next){
  ImagePost.findOne({slug: req.params.slug},function(err, post, count){
  	res.render('image-post', {post:post, slug:req.params.slug});
  });	
});

router.post('/edit-post/:slug', function(req, res, next){
  ImagePost.findOneAndUpdate({slug: req.params.slug}, {$push: {images: {caption: req.body.caption, url: req.body.url}}}, function(err, post, count){
  	res.redirect('/image-post/'+req.params.slug);
  });
});

router.post('/remove-img/:slug', function(req, res, next){
	console.log(req.body);
  if(Array.isArray(req.body.removal)){
  	for(var i=0; i<req.body.removal.length; i++){
  		ImagePost.findOneAndUpdate({slug: req.params.slug}, {$pull: {images: {_id: req.body.removal[i]}}}, function(err, post, count){
  			if(err){
  				console.log(err);
  			}
  		});
  	}
  }
  
  else if(req.body.removal !== undefined){
  		ImagePost.findOneAndUpdate({slug: req.params.slug}, {$pull: {images: {_id: req.body.removal}}}, function(err, post, count){
  			if(err){
  				console.log(err);
  			}
  		});
  }
  res.redirect('/image-post/'+req.params.slug);
});

module.exports = router;
