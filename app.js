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

var where = require('node-where');
var cities = require("all-the-cities");

var Twitter = require('twitter');
var getBearerToken = require('get-twitter-bearer-token')
var twitter_consumer_key = 'iYVPy2jjFhAHXjFerCw2CpoRA'
var twitter_consumer_secret = 'trD8PRzCGbeoguoT6CurrRScEWJG2wRUZkfNtGhJUInngCt1NC'
var twitter_token = 'AAAAAAAAAAAAAAAAAAAAAGdy9QAAAAAApJFUD%2FsF5Fm8kfurv79Ermqapls%3DYi9Z3uYtRYKpGMOZfm3OwpwtVPnDiJIIOYva3M7rb4MIK5Yx9Y'

var instagram_token = '23481001.4ded600.ee240e0288434f77b9a382a230f899ae'
var Instafeed = require("instafeed.js");

var yelp = require('yelp-fusion');

var yelp_ID = 'acGp9teuKjd9a9osC74G1Q'
var yelp_key = 'hiLPiqnAA1IT8VA6LIckjdhWxICk7A1dyUcVSbMEVpT3tLP9pgRuRpTf4T0FwZCJdhSiyLPggTSn3pvH4CoLnJFJCvdd3dJh37e61LQ0y4TmQVeou-OO_-J_5KOFXHYx'

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

// yelp api start

function initializeYelpAPI(Lat, Lng) {
    // Setting URL and headers for request
    var inputURL = 'https://api.yelp.com/v3/businesses/search?&term=food&latitude=' + Lat + '&longitude=' + Lng;
    var options = {
        url: inputURL,
        headers:{
        	Authorization: ' Bearer hiLPiqnAA1IT8VA6LIckjdhWxICk7A1dyUcVSbMEVpT3tLP9pgRuRpTf4T0FwZCJdhSiyLPggTSn3pvH4CoLnJFJCvdd3dJh37e61LQ0y4TmQVeou-OO_-J_5KOFXHYx'
        }
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

// yelp api end

function initializeInstagramAPI() {
    // Setting URL and headers for request
    var options = {
        url: 'https://api.instagram.com/v1/users/self/media/recent?access_token=23481001.4ded600.ee240e0288434f77b9a382a230f899ae'
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
    return new Promise(function(resolve, reject) {

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
  	// Ex: https://twitter.com/Michael_Tong1/status/1095885600484483079
  	var tweetID = [];
  	var tweetTime = [];
  	var returnArray = [];
            for (i = 0; i < 4; i++) 
        {
        	tweetText.push(tweets[i].text);
        	tweetID.push(tweets[i].id_str);
        	tweetTime.push(tweets[i].created_at);
        }

        returnArray = tweetText.concat(tweetID);
        returnArray = returnArray.concat(tweetTime); 


        resolve(returnArray); 

  }
  else {
  	reject(err);
  }
});})

}


function createPage(theURL, theTitle, theRender) 
{
	// Home Page
app.get(theURL, function(req, res) {
	var i; 
// Instagram API

	var InstaResponse = initializeInstagramAPI();
	InstaResponse.then(function(InstaResult) {

		var IR = []

		for (i = 0; i < 6; i++)
	{
		IR.push(InstaResult.data[i].images.standard_resolution.url);
		IR.push(InstaResult.data[i].link);
	}




// Instagram API End
// Blogger API Start

        // fix timestamp
        var timestamp = new Date().getTime();
        timestamp = timestamp - 28800000;
        // 3600

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
			itemTime[i] = moment(itemTime[i]).from(timestamp); 
        }

// Blogger API End

// Twitter API start
        // 0 - 3 text
        // 4 - 7 id_str
        // 8 - 11 timestamp



	var twitterResponse = initializeTwitterAPI();
	twitterResponse.then(function(twitterResult) {
		var TR = [];
		TR = twitterResult;
        for (i = 4; i < 8; i++) 
        {
		TR[i] = 'https://twitter.com/Michael_Tong1/status/' + TR[i]
        }
        for (i = 8; i < 12; i++) 
        {
        //console.log(TR[i]);	
        TR[i] = moment(new Date(TR[i]).getTime());
        TR[i] = moment(TR[i]).fromNow();
        //console.log(TR[i].toString());
        }


// Twitter API end


        	// T - Title
        	// U - URL
        	// C - Time 
        	// P - Picture

        	res.render(theRender, {
		title: theTitle,
		postT0: itemTitle[0],postU0: itemURL[0],postC0: itemTime[0],postT1: itemTitle[1],postU1: itemURL[1],postC1: itemTime[1],
		postT2: itemTitle[2],postU2: itemURL[2],postC2: itemTime[2],postT3: itemTitle[3],postU3: itemURL[3],postC3: itemTime[3],
		tweetT0: TR[0], tweetT1: TR[1], tweetT2: TR[2], tweetT3: TR[3], tweetU0: TR[4], tweetU1: TR[5], tweetU2: TR[6], 
		tweetU3: TR[7], tweetC0: TR[8], tweetC1: TR[9], tweetC2: TR[10], tweetC3: TR[11],
		instaP0: IR[0], instaU0: IR[1], instaP1: IR[2], instaU1: IR[3], instaP2: IR[4], instaU2: IR[5], instaP3: IR[6], 
		instaU3: IR[7], instaP4: IR[8], instaU4: IR[9], instaP5: IR[10], instaU5: IR[11],
	});


	}, function(err) {
        console.log(err);
    })

    }, function(err) {
        console.log(err);
    })
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



function createWebAppPage(theURL, theTitle, theRender) 
{
	// Web App
app.post(theURL, function(req, res) {
	var i; 
	var YR = []; // Yelp Result
	var lat;
	var lon;

	var textfield = req.body.textfield;

cities.filter(city => {
  console.log(city.name.match('Albuquerque')[0])
})



	var YelpResponse = initializeYelpAPI(lat, lon);
	YelpResponse.then(function(YelpResult) {

		for (i = 0; i < 20; i++)
		{
		YR.push(YelpResult.businesses[i].url);
		YR.push(YelpResult.businesses[i].image_url);
		}
        	res.render(theRender, {
		
		title: theTitle, titleBar: 'Reverse Restaurant Look-Up',
		yelpU0: YR[0],yelpP0: YR[1],yelpU1: YR[2],yelpP1: YR[3],yelpU2: YR[4],yelpP2: YR[5],
		yelpU3: YR[6],yelpP3: YR[7],yelpU4: YR[8], yelpP4: YR[9], yelpU5: YR[10], yelpP5: YR[11],
		yelpU6: YR[12],yelpP6: YR[13],yelpU7: YR[14],yelpP7: YR[15],yelpU8: YR[16],yelpP8: YR[17],
		yelpU9: YR[18],yelpP9: YR[19],yelpU10: YR[20], yelpP10: YR[21], yelpU11: YR[22], yelpP11: YR[23],
		yelpU12: YR[24],yelpP12: YR[25],yelpU13: YR[26],yelpP13: YR[27],yelpU14: YR[28],yelpP14: YR[29],
		yelpU15: YR[30],yelpP15: YR[31],yelpU16: YR[32], yelpP16: YR[33], yelpU17: YR[34], yelpP17: YR[35],
		yelpU18: YR[36],yelpP18: YR[37],yelpU19: YR[38], yelpP19: YR[39],
	});


	}, function(err) {
        console.log(err);
    })

});
}

// Food look-up web app
//createWebAppPage('/foodwebapp','Your eyes eat first.','food');

createWebAppPage('/foodresult','Your eyes eat first.', 'food');


	app.get('/foodwebapp',function(req,res) {
		res.render('foodstart', {
			title: 'Your eyes eat first.',
			titleBar: 'Reverse Restaurant Look-Up'
		});
	});



	// Clicking on My Simple Web App redirects you to dogwebapp
	app.get('/dogwebapp',function(req,res) {
		res.render('index', {
			title: 'Do you like dogs?',
			titleBar: 'Random Dog Generator'
		});
	});


	app.post('/result', function(req,res) {
		if ((req.body.Result) === 'Yes') {
				res.render('good', {
			title: 'Hey nice! Me too! What kind of dogs are you looking for?',
			titleBar: 'Random Dog Generator'

		});
		 }else {

				res.render('bad', {
			title: 'Ohno!',
			titleBar: 'Random Dog Generator'
		});
		}
	});
		
	app.post('/choose', function(req,res) {
		if ((req.body.Choose) === 'Fluffy') {
			randomPuppy("fluffydogs")
		.then(url => {
			res.render('fluffy',{
				title: 'Here are tons of fluffy dogs! Keep clicking for more!',
				titleBar: 'Random Dog Generator',
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
				url: url,
				titleBar: 'Random Dog Generator'
			})
			});
		}else if ((req.body.Choose) === 'Smile') {
			randomPuppy("puppysmiles")
		.then(url => {
			console.log('onto next doggo');
			res.render('smile', {
				title: 'Here are tons of dogs smiling! Keep clicking for more!',
				url: url,
				titleBar: 'Random Dog Generator'
			})
			});
		}else if ((req.body.Choose) === 'Driving') {
			randomPuppy("dogsdrivingcars")
		.then(url => {
			console.log('onto next doggo');
			res.render('driving', {
				title: 'Here are tons of dogs driving cars! Keep clicking for more!',
				url: url,
				titleBar: 'Random Dog Generator'
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
			url: url,
			titleBar: 'Random Dog Generator'
		}) 
		});

	});

	app.get('/nextfluffydoggo', function(req,res) {
			randomPuppy("fluffydogs")
		.then(url => {
				console.log('onto next doggo');
				res.render('fluffy', {
			title: 'Here are tons of fluffy dogs! Keep clicking for more!',
			url: url,
			titleBar: 'Random Dog Generator'
		}) 
		});

	});

	app.get('/nexttinydoggo', function(req,res) {
			randomPuppy("tinydogs")
		.then(url => {
				console.log('onto next doggo');
				res.render('tiny', {
			title: 'Here are tons of tiny dogs! Keep clicking for more!',
			url: url,
			titleBar: 'Random Dog Generator'
		}) 
		});

	});

	app.get('/nextsmiledoggo', function(req,res) {
			randomPuppy("puppysmiles")
		.then(url => {
				console.log('onto next doggo');
				res.render('smile', {
			title: 'Here are tons of dogs smiling! Keep clicking for more!',
			url: url,
			titleBar: 'Random Dog Generator'
		}) 
		});

	});


	app.get('/nextdrivingdoggo', function(req,res) {
			randomPuppy("dogsdrivingcars")
		.then(url => {
				console.log('onto next doggo');
				res.render('driving', {
			title: 'Here are tons of dogs driving cars! Keep clicking for more!',
			url: url,
			titleBar: 'Random Dog Generator'
		}) 
		});

	});

	// End of Dog Web App





