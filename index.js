import { createServer } from "http";
import { readFile } from "fs";


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