const fs = require("fs"); 
const http = require("http");  
const book = require('./lib/books.js');

//index.js import 
var books = require("./lib/books.js")

createServer(function(req,res)
 {                 
    console.log("url = " + req.url)
    console.log("dir = " + __dirname)

    var path = req.url.toLowerCase()
    switch(path) {
            
        case '/':
        readFile(__dirname + 'public/home.html', function(err, data) {
                if (err) {
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end('500 - internal error');
                    } else {
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.end(data);
                    }
                    });

                    app.get('/', function(req,res){
                        res.type('text/html');
                        res.sendFile(__dirname + '/public/home.html'); 
                    });
                    app.get('/delete', function(req,res){
                        let result = book.delete(req.query.title); 
                        res.render('delete', {title: req.query.title, result: result});
                    });
                    
    break;
            
    case '/about':
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('About Page');
    break;

    default:
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not found');
    break;     
            
    }
}
).listen(process.env.PORT || 3000);