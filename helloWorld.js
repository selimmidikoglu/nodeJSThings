var http = require('http');
var fs = require('fs');


function serverStaticFile(res, path, contentType, responseCode){
    if(!responseCode) responseCode = 200;
    fs.readFile(__dirname + path, function(err,data){
        if(err)
        {
            res.writeHead(500, {'Content-Type': 'text/plain'});
        }
        else
        {
            res.writeHead(200,{'Content-Type': 'text/plain'});
        }
    });
}

http.createServer(function(req,res){
    var path = req.url.replace(/\/?(?:\?,*)?$/,'').toLowerCase();

    switch(path){
        case '':
            serverStaticFile(res,'/public/home.html','text/html');
            break;
        case 'about':
            serverStaticFile(res,'/public/about.html','text/html');
            break;
        case '/img/logo.jpg':
            serverStaticFile(res,'/public/img/logo.jpg','image,jpg');
            break;
        default:
            serverStaticFile(res,'/public/404.html', 'text/html');
            break;
    }
}).listen(3000);

console.log('server is activated');