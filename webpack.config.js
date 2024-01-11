const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	mode: 'development',
	entry: './src/index.jsx',
	output: {
		filename: 'bundle.[chunkhash].js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
		assetModuleFilename: '[name][ext]'
	},
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
				// use: {
				// 	loader: 'babel-loader',
				// 	options: {
				// 		"presets": ["env", "react"]
				// 	}
				// }
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader, 
					{loader: "css-loader", options: {url: false}}, 
					"sass-loader"
				]
			},
			{
				test: /\.css$/i,
				use: [
					MiniCssExtractPlugin.loader, 
					{loader: "css-loader", options: {url: false}}, 
				]
			}
		]
	},
	plugins: [

		// compiles the CSS
		new MiniCssExtractPlugin({
			filename: "./style.css"
		}),

		// Create the main html loader, this starts the React App
		new HtmlWebpackPlugin({
			template: './frontend-loader.html'
		}),

		// Populate React environment variables
		new webpack.DefinePlugin({
			'process.env': {
				// NODE_ENV: JSON.stringify(process.env.NODE_ENV),
				...Object.keys(process.env)
				.filter(key => key.startsWith('REACT_APP_'))
				.reduce((env, key) => {
					env[key] = JSON.stringify(process.env[key]);
            		return env;
				}, {}),
			},
		}),

	],
	resolve: {
		extensions: ['*','.js','.jsx'],
		modules:[
			path.resolve(`${__dirname}/src`),
			path.resolve(`${__dirname}/node_modules`)
		]
	},

	watch: false,
	watchOptions:{
		ignored: /node_modules/
	}
}