'use strict';

module.exports = function(grunt) {

  // measures the time each task takes
  require('time-grunt')(grunt);
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),  // Parse package.json info
    // jshint all the src files.
    jshint: {
      options: {
	eqeqeq: true,
	trailing: true
      },
      target: {
	src : ['lib/**/*.js',
               'test/**/*.js',
               '!lib/garbage/**/*',]
      }
    },
    // run the mocha tests via Node.js
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          // require: 'coverage/blanket',
          captureFile: 'test/output/output.txt'
        },
        
        src: ['test/**/*.js']
      }
    },
    // remove all previous browserified builds
    clean: {
      dist: ['./browser/dist/**/*'],
      tests: ['./browser/test/browserified_tests.js',
              './test/output/**/*']
    },
    // Parse AST for require() and build the browser code.
    browserify: {
      standalone: {
        src: [ 'fish.js' ],
        dest: './browser/dist/<%= pkg.name %>.standalone.js',
        options: {
            standalone: '<%= pkg.name %>'
        }
      },
      require: {
        src: [ 'fish.js' ],
        dest: './browser/dist/<%= pkg.name %>.require.js',
        options: {
          alias: [ './fish.js:' ]
        }
      },
      tests: {
        src: [ 'browser/test/suite.js' ],
        dest: './browser/test/browserified_tests.js',
        options: {
          external: [ './index.js' ],
          // Embed source map for tests
          debug: true
        }
      }
    },
    // Start the basic web server from connect.
    connect: {
      server: {},
      keepalive: {
        options: {
          keepalive: true
        }
      }
    },
    // run the mocha tests in the browser via PhantomJS
    mocha_phantomjs: {
      all: {
        options: {
          urls: [
            'http://127.0.0.1:8000/browser/test/index.html'
          ]
        }
      }
    },
    // uglify our one fish.js file.
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        files: {
          'browser/dist/<%= pkg.name %>.standalone.min.js':
          ['<%= browserify.standalone.dest %>'],
        }
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-mocha-phantomjs');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.registerTask('default', ['jshint', 'mochaTest', 'clean', 'browserify', 'connect:server', 'mocha_phantomjs', 'uglify']);
  grunt.registerTask('test', ['clean', 'jshint', 'mochaTest', 'browserify', 'connect:server', 'mocha_phantomjs']);
};


