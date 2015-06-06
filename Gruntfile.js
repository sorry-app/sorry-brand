/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    aws: grunt.file.readJSON('aws.json'),

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

    // Clean the build directory before we do anything.
    clean: ["dist/"],    

    // Copy built assets ready for distribution.
    copy: {
      main: {
        files: [
          { expand: true, cwd: 'build/', src: ['**'], dest: 'dist/' },
        ],
      },
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
    },

    aws_s3: {
      options: {
        accessKeyId: '<%= aws.key %>',
        secretAccessKey: '<%= aws.secret %>',
        region: 'eu-west-1',
        bucket: 'brand.sorryapp.com'
      },
      main: {
        files: [
          { action: 'upload', expand: true, cwd: 'dist/', src: ['**'] },
        ]
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-aws-s3');

  // Publish Task.
  // Publishes a new version as a relase and pushes up to the CDN.
  grunt.registerTask('publish', ['jshint', 'clean', 'copy', 'compress', 'bump', 'aws_s3']);
};