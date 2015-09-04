# grunt-connect-devproxy [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> A web server for selective local development


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
		options: {
			basePath: __dirname,
			port: 3000,
			localMappings: {
				'/css/': '/css/'
			},
			urlRewrites: [
				'static/v([0-9]+)/ static/v0/'
			],
			remoteURL: 'http://dwyerphilanthropy.com/'
		}
	}
});
```

`localMappings` is an object containing pairs in the format ** remote path: local path **
 
 `urlRewrites` is an array containing valid mod_rewrite formatted rewrite strings. More information: <http://www.sitepoint.com/guide-url-rewriting/>

## License

MIT © [Hanson Inc](http://hansoninc.com)


