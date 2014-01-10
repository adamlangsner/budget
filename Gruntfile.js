module.exports = function(grunt) {

    grunt.initConfig({
        watch: {
            styles: {
                files: ['public/assets/styles/scss/*.scss'],
                tasks: ['compass:compile', 'notify:watch']
            }
        },

        compass: {
            compile: {
                src: 'public/assets/styles/scss',
                dest: 'public/assets/styles/css',
                linecomments: false,
                forcecompile: true,
                debugsass: false,
                images: 'public/assets/images/',
                relativeassets: true
            }
        },

        concat: {
            js: {
                src: ['public/assets/scripts/libs/require.js', 'build/app.js'],
                dest: 'build/app.js'
            }
        },

        uglify: {
            js: {
                files: {
                    'build/app.js': ['build/app.js']
                }
            }
        },

        copy: {
            css: {
                files: [{
                    src: 'public/assets/styles/css/app.css',
                    dest: 'build/css/app.css'
                }]
            },
            images: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: 'public/assets/images/*.png',
                    dest: 'build/images/',
                    filter: 'isFile'
                }, {
                    expand: true,
                    flatten: true,
                    src: 'public/assets/images/repeating/*.png',
                    dest: 'build/images/repeating/',
                    filter: 'isFile'
                }]
            }
        },

        requirejs: {
            compile: {
                options: {
                    baseUrl: 'public/assets/scripts',
                    mainConfigFile: 'public/assets/scripts/main.js',
                    name: 'main',
                    preserveLicenseComments: false,
                    out: 'build/app.js'
                }
            }
        },

        templates: {
            compile: {
                src: 'public/assets/templates/**/*.html',
                dest: 'build/app.xml'
            }
        },

        notify: {
            watch: {
                options: {
                    title: 'CSS compiled'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-requirejs');
    grunt.loadNpmTasks('grunt-compass');
    grunt.loadNpmTasks('grunt-notify');

    grunt.loadTasks('grunt_tasks');

    grunt.registerTask('default', [
        'requirejs',
        'concat:js',
        'uglify:js',
        'compass:compile',
        'copy:css',
        'copy:images',
        'templates:compile'
    ]);
};