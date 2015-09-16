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

	// Start a custom connect server --
	grunt.registerMultiTask('devproxy', 'Start a proxyable web server.', function() {

		var options = this.options({
			basePath: __dirname,
			port: 3000,
			localMappings: {},
			remoteURL: null,
			urlRewrites: [],
			keepalive: true
		});

		grunt.log.writeln('Starting web server on port ' + options.port + '.');

		// Initialize connect
		var app = connect();

		if ( !options.remoteURL ) {
			grunt.log.error('No Remote URL specified. Quitting!');
			return;
		}

		// set up URL rewrites
		if ( Object.keys(options.urlRewrites).length ) {
			grunt.log.writeln('Setting up URL rewrites: ' + options.urlRewrites);
			app.use( modRewrite( options.urlRewrites ) );
		}

		// Set up locally-mapped content paths
		var localMappings = Object.keys( options.localMappings );
		for (var i = 0; i < localMappings.length; i++) {
			var nextMapping = options.localMappings[ localMappings[i] ];
			grunt.log.writeln('Mapping ' +  localMappings[i] + ' to ' + path.join(options.basePath, nextMapping) );
			app.use( localMappings[i], serveStatic( path.join(options.basePath, nextMapping) ) );
		}

		// Proxy all other requests to the dev server.
		grunt.log.writeln('Proxying requests to ' + options.remoteURL);
		app.use( '/', proxy( url.parse(options.remoteURL) ) );

		// Ignore certificate errors.
		process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

		// Create http server and listen on port 3000
		http.createServer(app).listen(options.port);

		if (options.keepalive === true) {
			grunt.log.writeln('Waiting forever...');
			this.async();
		}
	});

};
