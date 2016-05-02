//demo.js
var http =require('http'),
    fs = require('fs');
var port = 3000;
http.createServer(handleRequest).listen(3000);
console.log('Started server on port', port);

//if serveStatic can't be loaded, give 500 response

function serveStatic(req, res, path, headers, resCode) {
    var d = new Date();
    console.log(d.toUTCString() + " " + req.method + " " + req.url +" " +resCode  );
    fs.readFile(path, function(err, data) {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' }); 
            res.end('500 - Internal Error');
        } else {
            res.writeHead(resCode, { 'Content-Type': headers }); 
            res.end(data);
        }
    });
}

function handleRequest(req, res) {
    req.url = req.url.toLowerCase();
    if (req.url === '/home' || req.url === '/') {
        serveStatic(req, res, './public/index.html', 'text/html', 200);
    } else if (req.url === '/about'){
        serveStatic(req, res, './public/about.html', 'text/html', 200);
    } else if (req.url === '/me') {
        serveStatic(req, res,  "./public/about.html", { 'Content-Type': 'text/html', 'Location': './public/about.html'} , 301);
    } else if (req.url === '/img/image1.png') {
        serveStatic(req, res, './public/img/image1.png', 'image/png', 200);
    } else if (req.url === '/img/image2.png'){
        serveStatic(req, res, './public/img/image2.png', 'image/png', 200);
    } else if (req.url === '/css/base.css'){
        serveStatic(req, res, './public/css/base.css', 'text/css', 200);
    } 
    else {
        serveStatic(req, res, './public/404.html', 'text/html', 404);
    }
}
