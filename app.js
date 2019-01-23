var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var app = express();
var randomPuppy = require('random-puppy');
var doggo = randomPuppy();
var unirest = require('unirest');
var axios = require('axios');
var events = require('events');
var eventEmitter = new events.EventEmitter();
var request = require("request");


// Blogger API
/*
function getPosts() {
app.get('https://www.googleapis.com/blogger/v3/blogs/8300627851746571333/posts?key=AIzaSyA9qXj63WzU2Es8IrO1spSZL78OWLV4oWc')
.then(response => {
console.log('axios start');
console.log((response.data.items)[0].title);
console.log('axios end');
return ((response.data.items)[0].title);
})
.catch(error => {
console.log(error);
});
}
*/
// End of Blogger API

function createPage(theURL, theTitle, theRender) 
{
	// Home Page
app.get(theURL, function(req, res) {

	var i; 
	var initializePromise = initialize();
    initializePromise.then(function(result) {
    	var item = [];
        for (i = 0; i < 4; i++) 
        {
        	item.push((result.items)[i].title);
        	item.push((result.items)[i].url);
        }

        	res.render(theRender, {
		title: theTitle,
		postT0: item[0],
		postU0: item[1],
		postT1: item[2],
		postU1: item[3],
		postT2: item[4],
		postU2: item[5],
		postT3: item[6],
		postU3: item[7],						
	});
    }, function(err) {
        console.log(err);
    })
});
}


function initialize() {
    // Setting URL and headers for request
    var options = {
        url: 'https://www.googleapis.com/blogger/v3/blogs/8300627851746571333/posts?key=AIzaSyA9qXj63WzU2Es8IrO1spSZL78OWLV4oWc'
    };
    // Return new promise 
    return new Promise(function(resolve, reject) {
    	// Do async job
        request.get(options, function(err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        })
    })

}

var logger = function(req, res, next) {
	next();
}

app.use(logger);

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})); 

// Set Static Path
var publicDir = require('path').join(__dirname,'public');
app.use(express.static(publicDir));

// Home Page
createPage('/','Home Page','index2');

// Clicking on My Simple Web App redirects you to dogwebapp

app.get('/dogwebapp',function(req,res) {
	res.render('index', {
		title: 'Do you like dogs?'
	});
});


app.post('/result', function(req,res) {
	if ((req.body.Result) === 'Yes') {
			res.render('good', {
		title: 'Hey nice! Me too! What kind of dogs are you looking for?',

	});
	 }else {

			res.render('bad', {
		title: 'Ohno!'
	});
	}
});
	
app.post('/choose', function(req,res) {
	if ((req.body.Choose) === 'Fluffy') {
		randomPuppy("fluffydogs")
	.then(url => {
		res.render('fluffy',{
			title: 'Here are tons of fluffy dogs! Keep clicking for more!',
			url: url,
		})
		});
	}else if ((req.body.Choose) === 'Tiny') {
		randomPuppy("tinydogs")
	.then(url => {
		console.log('onto next doggo');
		console.log('tiny');
		res.render('tiny', {
			title: 'Here are tons of tiny dogs! Keep clicking for more!',
			url: url
		})
		});
	}else if ((req.body.Choose) === 'Smile') {
		randomPuppy("puppysmiles")
	.then(url => {
		console.log('onto next doggo');
		res.render('smile', {
			title: 'Here are tons of dogs smiling! Keep clicking for more!',
			url: url
		})
		});
	}else if ((req.body.Choose) === 'Driving') {
		randomPuppy("dogsdrivingcars")
	.then(url => {
		console.log('onto next doggo');
		res.render('driving', {
			title: 'Here are tons of dogs driving cars! Keep clicking for more!',
			url: url
		})
		});
	}else {
	
	}
});


app.get('/nextdoggo', function(req,res) {
		randomPuppy("fluffydogs")
	.then(url => {
			console.log('onto next doggo');
			res.render('doggopage', {
		title: 'Glad you like dogs! Keep clicking for more!',
		url: url
	}) 
	});

});

app.get('/nextfluffydoggo', function(req,res) {
		randomPuppy("fluffydogs")
	.then(url => {
			console.log('onto next doggo');
			res.render('fluffy', {
		title: 'Here are tons of fluffy dogs! Keep clicking for more!',
		url: url
	}) 
	});

});

app.get('/nexttinydoggo', function(req,res) {
		randomPuppy("tinydogs")
	.then(url => {
			console.log('onto next doggo');
			res.render('tiny', {
		title: 'Here are tons of tiny dogs! Keep clicking for more!',
		url: url
	}) 
	});

});

app.get('/nextsmiledoggo', function(req,res) {
		randomPuppy("puppysmiles")
	.then(url => {
			console.log('onto next doggo');
			res.render('smile', {
		title: 'Here are tons of dogs smiling! Keep clicking for more!',
		url: url
	}) 
	});

});


app.get('/nextdrivingdoggo', function(req,res) {
		randomPuppy("dogsdrivingcars")
	.then(url => {
			console.log('onto next doggo');
			res.render('driving', {
		title: 'Here are tons of dogs driving cars! Keep clicking for more!',
		url: url
	}) 
	});

});

// End of Dog Web App

// About me 
createPage('/aboutme','About Me','aboutme')

// Contact me
createPage('/contactme','Contact Me', 'contactme');

// My resume
createPage('/myresume','My Resume', 'resume');

createPage('/left','Home page?? hey','left-sidebar');

app.listen(8080, function() {
	console.log("Server started...");
})



