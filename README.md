# grunt-connect-devproxy: A web server for selective local development

## Install

```sh
$ npm install --save grunt-connect-devproxy
```

## Usage

Configure `grunt-connect-devproxy` in your Gruntfile:

### Example configuration:
```js
grunt.initConfig({
	devproxy: {
		default: {
			options: {
				basePath: __dirname,
				port: 3000,
				urlRewrites: [
					'favicon.ico imgs/favicon.ico'
				],
				localMappings: {
					'/css/': 'static/css/',
					'/imgs/': 'static/imgs/'
				},
				remoteURL: 'http://yourwebsite.com/'
			}
		}
	}
});
```

`localMappings` is an object containing pairs in the format ** remote path: local path **
 
 `urlRewrites` is an array containing valid mod_rewrite formatted rewrite strings. More information: <http://httpd.apache.org/docs/2.0/misc/rewriteguide.html>

## License

MIT © [Hanson Inc](http://hansoninc.com)


