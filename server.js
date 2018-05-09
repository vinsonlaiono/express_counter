// require express
var express = require("express");
var path = require("path");
var session = require('express-session');
var app = express();
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))

// create the express app
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view


app.get('/', function(req, res) {
    if (req.session.views) {
        var count = req.session.views++
      } else {
        var count  = req.session.views = 1
      }

    res.render("index", {count: count});
})
app.get('/addtwo', function(req, res) {
    if (req.session.views) {
        var count = req.session.views++
      } 

    res.redirect("/");
})


app.get('/reset', function(req, res) {
    req.session.destroy(function(err) {
        // cannot access session here
      })

    res.redirect("/");
})

// tell the express app to listen on port 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
});