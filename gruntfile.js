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
      build: {
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
            'build/css/page.css': 'assets/sass/page.scss',
        }
      },
      build: {
        options : {
          style: 'compressed'
        },
        files: {
            'build/css/style.css': 'assets/sass/style.scss',
            'build/css/page.css': 'assets/sass/page.scss',
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
          tasks: ['uglify'],
          options: {
              spawn: false,
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
  grunt.registerTask('default', ['uglify', 'sass:build', 'imagemin']);

 
 
}