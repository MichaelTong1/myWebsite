var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var app = express();
var randomPuppy = require('random-puppy');
var doggo = randomPuppy();
var unirest = require('unirest');


// Blogger API

	function getPosts () {
	unirest.get("https://www.googleapis.com/blogger/v3/blogs/8300627851746571333/posts?key=AIzaSyA9qXj63WzU2Es8IrO1spSZL78OWLV4oWc")
	.end(function (result) {
		const bloginfo = [];
		bloginfo.push(((result.body).items)[0].title);
  		bloginfo.push(((result.body).items)[0].url);
    	bloginfo.push(((result.body).items)[1].title);
 		bloginfo.push(((result.body).items)[1].url);
      	bloginfo.push(((result.body).items)[2].title);
 		bloginfo.push(((result.body).items)[2].url);
console.log(bloginfo[0]);
	return JSON.stringify(bloginfo);
		});
}
// End of Blogger API

var logger = function(req, res, next) {
	next();
}

app.use(logger);

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: false})); 




// Set Static Path
var publicDir = require('path').join(__dirname,'public');
app.use(express.static(publicDir));

app.get('/', function(req, res) {
	var p = 'ay22';
	res.render('index2', {
		title: 'Home Page',
		myPosts: p
	});
});

// Clicking on My Simple Web App redirects you to dogwebapp

app.get('/dogwebapp',function(req,res) {
	res.render('index', {
		title: 'Do you like dogs?'
	});
});

app.get('/aboutme',function(req,res) {
	res.render('aboutme', {
		title: 'About Me'
	});
});

app.get('/contactme',function(req,res) {
	res.render('contactme', {
		title: 'Contact Me'
	});
});

app.get('/myresume',function(req,res) {
	res.render('resume', {
		title: 'My Resume'
	});
});

app.get('/left',function(req,res) {
	res.render('left-sidebar', {
		title: 'Home Page'
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




app.listen(8080, function() {
	console.log("Server started...");
})



