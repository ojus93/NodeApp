// Base Set up
var express = require('express');
var app = express();						// define our app using express
var bodyParser = require('body-Parser');
var mongoose = require('mongoose');
var Bear = require('../app/models/bear.js');

mongoose.connect('mongodb://ojus:ojus@ds057954.mongolab.com:57954/demo');
//configure app using bodyParser()
//this will let us get data from a post
app.use(bodyParser.urlencoded({ extend: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.use(function(req,response,next){
	console.log('Something hAappens becoz of apis');
	next();
});


router.route('/bears')
.post(function(req,res){
		var bear = new Bear();
		bear.name = req.body.name;
		console.log('hello');	
		bear.save(function(err){
			if(err)
				{	console.log('errror');
					 res.send(err);
				}
				console.log('save succesfull');
			 res.json({message : 'Bear created'});
		});
		//res.json({message : 'Bear created'});
	})
.get(function(req, res) {
        Bear.find(function(err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });
    });


router.get('/',function(req,res){
	res.json({message : 'Hurray!! Welcome to our API' });
});
app.use('/home', router);
app.listen(port);
console.log('Magic happens on port : '+ port);	