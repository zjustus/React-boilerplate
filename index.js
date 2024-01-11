const express = require('express')
const app = express()
const port = 8080
const fs = require('fs')
const path = require('path')

// const webpack = require('webpack');
// const config = require('./webpack.config');
// const compiler = webpack(config);

app.listen(port, () => { console.log(`App Running on port ${port}`)});

// Sends environment variables for front end usage
app.get('/env-variables', (req, res) => {
	res.json({
		NODE_ENV: process.env.NODE_ENV,
		...Object.keys(process.env)
		.filter(key => key.startsWith('REACT_APP_'))
		.reduce((env, key) => {
			env[key] = process.env[key];
			return env;
		}, {}),
	});
});

app.get('*', (req, res) => {
	// console.log(req.path.split('.').length)
	// res.sendFile(path.join(__dirname, 'dist', 'index.html'));

	// if no file extension is given, route to index.html
	if(req.path.split('.').length == 1)
		res.sendFile(path.join(__dirname, 'dist', 'index.html'));
	else if(fs.existsSync(path.join(__dirname, 'dist', req.path)))
		res.sendFile(path.join(__dirname, 'dist', req.path));
	else if(fs.existsSync(path.join(__dirname, 'public', req.path)))
		res.sendFile(path.join(__dirname, 'public', req.path));
	else
		res.status(404).sendFile(path.join(__dirname, 'dist', 'index.html'));
});
