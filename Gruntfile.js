module.exports = function (grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-pug');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    var coffeeFiles = [
        'coffee/FIXME.coffee',
    ];

    // Project configuration
    grunt.initConfig({
        coffee: {
            dev: {
                options: {
                    bare: true,
                    join: true
                },
                files: {
                    'dev/all.js': coffeeFiles
                }
            },
            prod: {
                options: {
                    bare: true,
                    join: true
                },
                files: {
                    'prod/all_original.js': coffeeFiles
                }
            }
        },
        pug: {
            dev: {
                options: {
                    pretty: true
                },
                files: {
                    'dev/index.html': 'pug/index.pug'
                }
            },
            prod: {
                options: {
                    pretty: false
                },
                files: {
                    'prod/index.html': 'pug/index.pug'
                }
            }
        },
        sass: {
            dev: {
                options: {
                    sourcemap: 'none'
                },
                files: {
                    'dev/all.css': 'sass/all.scss'
                }
            },
            prod: {
                options: {
                    sourcemap: 'none',
                    outputStyle: 'compressed'
                },
                files: {
                    'prod/all.css': 'sass/all.scss'
                }
            }
        },
        watch: {
            coffee: {
                files: 'coffee/**/*.coffee',
                tasks: ['coffee:dev'],
                options: {
                    interrupt: true,
                    atBegin: true
                }
            },
            pug: {
                files: 'pug/**/*.pug',
                tasks: ['pug:dev'],
                options: {
                    interrupt: true,
                    atBegin: true
                }
            },
            sass: {
                files: 'sass/**/*.scss',
                tasks: ['sass:dev'],
                options: {
                    interrupt: true,
                    atBegin: true
                }
            }
        },
        concurrent: {
            dist: {
                tasks: ['watch:coffee', 'watch:sass', 'watch:pug'],
                options: {
                    logConcurrentOutput: true,
                    limit: 3
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    'prod/all.js': 'prod/all_original.js'
                }
            }
        },
        copy: {
          dev: {
            src: ['imgs/**', 'fonts/**', 'favicons/**'],
            dest: 'dev/',
            expand: true,
            flatten: true
          },
          prod: {
            src: ['imgs/**', 'fonts/**', 'favicons/**'],
            dest: 'prod/',
            expand: true,
            flatten: true
          }
        }
    });

    grunt.registerTask('default', 'concurrent');

    grunt.registerTask('dev', [
        'coffee:dev',
        'pug:dev',
        'sass:dev',
        'copy:dev',
    ]);

    grunt.registerTask('prod', [
        'coffee:prod',
        'pug:prod',
        'sass:prod',
        'copy:prod'
    ]);
};
