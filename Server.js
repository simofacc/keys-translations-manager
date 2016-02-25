var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var webpack = require('webpack');
var config = require('./src/config');
var TranslationController = require('./src/api/TranslationController');
var app = express(),
	config,
	compiler;

mongoose.connect(config.database, function(err) {
	if (err) {
		console.log('Failed to connect database', err);
		return;
	//} else {
	//	console.log('Connect to database successfully.');
	}
});

app.listen(config.server.port, config.server.hostname, function(err) {
	if (err) {
		console.log(err);
		return;
	}
	console.log("process.env.NODE_ENV:", process.env.NODE_ENV);
	if (process.env.NODE_ENV === 'production') {
		console.log('The server (at http://localhost:3000) has started.');
	} else {
		console.log('Dev-server (at http://localhost:3000) is starting, please wait ...');
	}
});


if (process.env.NODE_ENV === 'production') {
	app.use('/public', express.static(path.join(__dirname, 'public')));
} else {
	config = require('./webpack.config.dev');
	compiler = webpack(config);
	app.use(require('webpack-dev-middleware')(compiler, {
		/*stats: {
			colors: true
		},*/
		noInfo: true,
		publicPath: config.output.publicPath
	})).use(require('webpack-hot-middleware')(compiler));
}
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", TranslationController);
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
});