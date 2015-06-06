/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      }
    },

    // gzip assets 1-to-1 for production
    compress: {
      main: {
        options: {
          archive: 'dist/sorry-branding.zip'
        },
        expand: true,
        cwd: 'public/',
        src: ['**/*']
      }
    },

    // Release & Deployment Tasks.
    bump: {
      options: {
        tagName: '%VERSION%',
        pushTo: 'origin'
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-contrib-compress');

  // Default task.
  grunt.registerTask('default', ['jshint']);

  // Publish Task.
  // Publishes a new version as a relase and pushes up to the CDN.
  grunt.registerTask('publish', ['default', 'bump']);
};