var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');

var session = require('express-session');

var router = require('./routes/routes');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));


// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(fileUpload({
    safeFileNames: true,
    preserveExtension: true
}));

app.use(session({secret: "dzindr dzinder secret"}));

// use res.render to load up an ejs view file
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// index page 
app.use('/', router);

app.listen(3000);
console.log('8080 is the magic port');