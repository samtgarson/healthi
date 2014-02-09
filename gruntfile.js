module.exports = function(grunt) {

  //Load NPM tasks

    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-imagemin");
 
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //Minify JS

    uglify: {
      dev: {
        options : {
          mangle: false,
          beautify: true
        },
        files: {
          'build/js/script.min.js': ['assets/js/*.js']
        }
      },
      build: {
        options: {
          compress: true
        },
        files: {
          'build/js/script.min.js': ['assets/js/*.js']
        }
      }
    },

    // Compile CSS

    sass: {
      dev: {
        options : {
          style: 'expanded'
        },
        files: {
            'build/css/style.css': 'assets/sass/style.scss',
        }
      },
      build: {
        options : {
          style: 'compressed'
        },
        files: {
            'build/css/style.css': 'assets/sass/style.scss',
        }
      }
    },

    // Optimise images
    imagemin: {
      build: {
        options: {
          pngquant: true
        },
        files: [{
          expand: true,
          cwd: 'build/img',
          src: ['**/*.{png,jpg,gif}'],  
          dest: 'build/img'
        }]
      }
    },
    // Watch
 
    watch: {
      scripts: {
          files: ['assets/js/*.js'],
          tasks: ['uglify:dev'],
          options: {
              spawn: false,
              livereload: true
          },
      },

      css: {
        files: 'assets/sass/style.scss',
        tasks: ['sass:dev'],
        options: {
          livereload: true
        }

      }
    }

  });
 
  // build
  grunt.registerTask('default', ['uglify:build', 'sass:build', 'imagemin']);

 
 
}