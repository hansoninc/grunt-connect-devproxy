/**
 * A Grunt task for selective local development. Creates a grunt-connect server
 * and allows some directories to be proxied to a remote server while others
 * are served locally.
 */

'use strict';

module.exports = function(grunt) {
	var modRewrite = require('connect-modrewrite');
	var connect = require('connect');
	var http = require('http');
	var url = require('url');
	var proxy = require('proxy-middleware');
	var serveStatic = require('serve-static');
	var path = require("path");

	var options = this.options({
		port: 3000,
		localMappings: {
			'/static/v0/': '/Static'
		},
		remoteURL: 'http://homecenter-dev.hansonoc.com/',
		urlRewrites: [
			'static/v([0-9]+)/ static/v0/'
		]
	});

	// Start a custom connect server --
	grunt.registerTask('devproxy', 'Start a proxyable web server.', function() {
		grunt.log.writeln('Starting web server on port ' + options.port + '.');

		// Initialize connect
		var app = connect();

		// set up URL rewrites
		grunt.log.writeln('Setting up URL rewrites:' + options.urlRewrites);
		app.use( modRewrite( options.urlRewrites ) );

		// Serve locally-mapped content
		for (var i in localMappings) {
			var nextMapping = localMappings[i];
			grunt.log.writeln('Mapping ' +  i + ' to ' + path.join(__dirname + nextMapping) );
			app.use( i, serveStatic(__dirname + nextMapping) );
		}

		// Proxy all other requests to the dev server.
		grunt.log.writeln('Proxying all other requests to ' + options.remoteURL);
		app.use( '/', proxy( url.parse(options.remoteURL) ) );

		// Ignore certificate errors.
		process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

		// Create http server and listen on port 3000
		http.createServer(app).listen(options.port);
	});

});
