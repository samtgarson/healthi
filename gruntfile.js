module.exports = function(grunt) {

  //Load NPM tasks

    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-imagemin");
    grunt.loadNpmTasks('grunt-html-build');
    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-notify');
 
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Start MAMP Server

    exec: {
      serverup: {
        command: '/Applications/MAMP/bin/start.sh'
      }
    },

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
          compress: true,
          beautify: true
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

    htmlbuild: {
      build: {
        src: 'assets/index.html',
        options: {
          sections: {
            templates: 'assets/tpl/**/*.html'
          }
        }
      }
    },

    responsive_images: {
      build: {  
        options: {
          sizes: [{ name: 'small', width: 320 },{ name: 'medium', width: 640 },{ name: 'large', width: 1280 }]
          // Task-specific options go here.
        },
        files: [{
          expand: true,
          src: ['**/*.{jpg,jpeg,png}'],
          cwd: 'assets/img/src',
          dest: 'assets/img/'
        }]
      }
    },

    notify: {
      sass: {
        options: {
          title: "Sass compiled",
          message: "Ready to go"
        }
      },
      uglify: {
        options: {
          title: "JS compiled",
          message: "Ready to go"
        }
      },
      html: {
        options: {
          title: "HTML compiled",
          message: "Ready to go"
        }
      }
    },

    // Watch
 
    watch: {
      htmlbuild: {
        files: ['assets/index.html', 'assets/tpl/*.html'],
        tasks: ['htmlbuild:build', 'notify:html'],
        options: {
            livereload: false
        }
      },
      scripts: {
          files: ['assets/js/*.js'],
          tasks: ['uglify:dev', 'notify:uglify'],
          options: {
              spawn: false,
              livereload: true
          },
      },

      css: {
        files: 'assets/sass/*.scss',
        tasks: ['sass:dev', 'notify:sass'],
        options: {
          livereload: true
        }

      }
    }

  });
 
  // build
  grunt.registerTask('default', ['uglify:build', 'sass:build', 'imagemin']);
  // dev
  grunt.registerTask('dev', ['exec:serverup', 'watch']);

 
 
}