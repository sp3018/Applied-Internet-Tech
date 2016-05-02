var express = require('express');
var path = require('path');
var handlebars = require('express-handlebars').create({ defaultLayout:'main' });

var app = express();
var publicPath = path.resolve(__dirname, "views");

app.use(express.static(publicPath));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.get('/', function(req, res){
    res.render('index.handlebars', res.headers);
});
app.get('/about', function(req, res){
    res.render('about.handlebars');
});

app.listen(3000);
console.log('Started server on port 3000');

