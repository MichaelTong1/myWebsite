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
var moment = require('moment');
var Twitter = require('twitter');
var getBearerToken = require('get-twitter-bearer-token')
var twitter_consumer_key = 'iYVPy2jjFhAHXjFerCw2CpoRA'
var twitter_consumer_secret = 'trD8PRzCGbeoguoT6CurrRScEWJG2wRUZkfNtGhJUInngCt1NC'
var twitter_token = 'AAAAAAAAAAAAAAAAAAAAAGdy9QAAAAAApJFUD%2FsF5Fm8kfurv79Ermqapls%3DYi9Z3uYtRYKpGMOZfm3OwpwtVPnDiJIIOYva3M7rb4MIK5Yx9Y'

var instagram_token = '23481001.4ded600.ee240e0288434f77b9a382a230f899ae'
var Instafeed = require("instafeed.js");

var http = require('http');
var https = require('https');
var fs = require('fs');

// Start HTTPS try


app.listen(8181, 'localhost');


const privateKey = fs.readFileSync(__dirname + '/public/encryption/privatekey.pem', 'utf8');
const certificate = fs.readFileSync(__dirname + '/public/encryption/certificate.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
};
/*


const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
	console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
});

*/

// end HTTP try




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

function initializeBloggerAPI() {
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



function initializeTwitterAPI()
{


	var client = new Twitter({
  consumer_key: twitter_consumer_key,
  consumer_secret: twitter_consumer_secret,
  bearer_token: twitter_token
});

var params = {screen_name: 'Michael_Tong1',
			  count: '4'
			};


client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
  	var tweetText = [];
            for (i = 0; i < 4; i++) 
        {
        	tweetText.push(response[i]);
        }
        console.log(tweetText);
  }
  else {
  	console.log(error);
  }
});


}

function createPage(theURL, theTitle, theRender) 
{
	// Home Page
app.get(theURL, function(req, res) {

	var i; 
	var initializePromise = initializeBloggerAPI();
    initializePromise.then(function(result) {
    	var ts = Date.now();
    	ts = ts.toString();
    	ts = ts.slice(0,-3);

    	var itemTitle = [];
    	var itemURL = [];
    	var itemTime = []; 
        for (i = 0; i < 4; i++) 
        {
        	itemTitle.push((result.items)[i].title);
        	itemURL.push((result.items)[i].url);
        	itemTime.push((result.items)[i].published);
        	itemTime[i] = itemTime[i].slice(0, -6); 

			itemTime[i] = moment(itemTime[i]).fromNow(); 

        }

        // try insta api

// use standard resolution: url as pic
// use link as url 
// https://api.instagram.com/v1/users/self/media/recent?access_token=23481001.4ded600.ee240e0288434f77b9a382a230f899ae
// will get the information

        // end insta api


        	// T - Title
        	// U - URL
        	// C - Time 

        	res.render(theRender, {
		title: theTitle,
		postT0: itemTitle[0],postU0: itemURL[0],postC0: itemTime[0],postT1: itemTitle[1],postU1: itemURL[1],postC1: itemTime[1],
		postT2: itemTitle[2],postU2: itemURL[2],postC2: itemTime[2],postT3: itemTitle[3],postU3: itemURL[3],postC3: itemTime[3]
	});

	initializeTwitterAPI();


    }, function(err) {
        console.log(err);
    })
});
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

// About me 
createPage('/aboutme','About Me','aboutme')

// Contact me
createPage('/contactme','Contact Me', 'contactme');

// My resume
createPage('/myresume','My Resume', 'resume');

// Try sidebar
createPage('/left','Home page?? hey','left-sidebar');


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





