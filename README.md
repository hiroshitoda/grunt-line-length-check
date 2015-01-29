# grunt-line-length-check

checking max line length of a file.


## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-line-length-check --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-line-length-check');
```


## task
_Run this task with the `grunt line-length-check` command._


### Options


#### basePath

Type: `String`  

#### encoding

Type: `String`  
Default: `utf8`

#### excludePatterns

Type: `Array`  

#### lengthUnit

Type: `String`  
Default: `character`

character or byte.

#### limitLength

Type: `Number`  

#### verbose

Type: `Boolean`  


#### Example config

```js
grunt.initConfig({
  'line-length-check': {               // Task
    basePath: 'src',
    encoding: 'utf8',
    excludePatterns: [ 'images', 'favicon.ico' ],
    lengthUnit: 'character',
    limitLength: 8 * 1024 * 0.98,
    verbose: false
  }
});

grunt.loadNpmTasks('grunt-line-length-check');
grunt.registerTask('default', ['grunt-line-length-check']);
```
