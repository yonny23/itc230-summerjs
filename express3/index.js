'use strict'

import { delete, get } from './lib/books.js';

import express, { static } from "express";
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(static(__dirname + '/public')); // allows direct navigation to static files
app.use(require("body-parser").urlencoded({extended: true}));

import handlebars from "express-handlebars";
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

//HOME
app.get('/', function(req,res){
    res.type('text/html');
    res.sendFile(__dirname + '/public/home.html'); 
});

//ABOUT
app.get('/about', function(req,res){
    res.type('text/plain');
    res.send('About page');
});

//DELETE
app.get('/delete', function(req,res){
    let result = delete(req.query.title); 
    res.render('delete', {title: req.query.title, result: result});
});

//DETAILS
app.post('/detail', function(req,res){
    console.log(req.body)
    var header = 'Searching for: ' + req.body.title + '<br>';
    var found = get(req.body.title);
    res.render("details", {title: req.body.title, result: found});
});

// 404
app.use(function(req,res) {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

//RUN SERVER
app.listen(app.get('port'), function() {
    console.log('Express started');    
});