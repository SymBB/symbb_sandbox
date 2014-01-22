var _ = require('underscore');

module.exports = function (grunt) {
    "use strict";

    var DemoPageBundle;

    var resourcesPath = 'src/Demo/PageBundle/Resources/';

    DemoPageBundle = {
        'destination':  'web/frontend/',
        'js':           [resourcesPath+'public/**/*.js', '!'+ resourcesPath+'public/vendor/**/*.js', 'Gruntfile.js'],
        'all_scss':     [resourcesPath+'public/scss/**/*.scss'],
        'scss':         [resourcesPath+'public/scss/style.scss', resourcesPath+'public/scss/legacy/ie/ie7.scss', resourcesPath+'public/scss/legacy/ie/ie8.scss'],
        'twig':         [resourcesPath+'views/**/*.html.twig'],
        'img':          [resourcesPath+'public/img/**/*.{png,jpg,jpeg,gif,webp}'],
        'svg':          [resourcesPath+'public/img/**/*.svg']
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            DemoPageBundleJs: {
                files: DemoPageBundle.js,
                tasks: 'jshint:DemoPageBundle',
                options: {
                    nospawn: true
                }
            },
            DemoPageBundleScss: {
                files: DemoPageBundle.all_scss,
                tasks: 'sass'
            },
            DemoPageBundleImages: {
                files: DemoPageBundle.img,
                tasks: ['imagemin:DemoPageBundle'],
                options: {
                    event: ['added', 'changed']
                }
            },
            DemoPageBundleSvg: {
                files: DemoPageBundle.svg,
                tasks: ['svg2png:DemoPageBundle'],
                options: {
                    event: ['added', 'changed']
                }
            },
            livereload: {
                files: [DemoPageBundle.js, DemoPageBundle.twig, DemoPageBundle.img, DemoPageBundle.svg, 'web/frontend/css/style.css'],
                options: {
                    livereload: true
                }
            }
        },

        jshint: {
            options: {
                camelcase: true,
                curly: true,
                eqeqeq: true,
                eqnull: true,
                forin: true,
                indent: 4,
                trailing: true,
                undef: true,
                browser: true,
                devel: true,
                node: true,
                globals: {
                    jQuery: true,
                    $: true
                }
            },
            DemoPageBundle: {
                files: {
                    src: DemoPageBundle.js
                }
            }
        },

        imagemin: {
            DemoPageBundle: {
                options: {
                    optimizationLevel: 3,
                    progressive: true
                },
                files: [{
                    expand: true,
                    cwd: 'src/Demo/PageBundle/Resources/public/img',
                    src: '**/*.{png,jpg,jpeg,gif,webp}',
                    dest: 'src/Demo/PageBundle/Resources/public/img'
                }]
            }
        },

        svg2png: {
            DemoPageBundle: {
                files: [{
                    src: DemoPageBundle.svg
                }]
            }
        },


        modernizr: {
            devFile: 'remote',
                outputFile: DemoPageBundle.destination + 'js/modernizr-custom.js',
                files: _.union(DemoPageBundle.js, DemoPageBundle.all_scss, DemoPageBundle.twig),
                parseFiles: true,
                extra: {
                'shiv' : true,
                    'printshiv' : false,
                    'load' : true,
                    'mq' : false,
                    'cssclasses' : true
            },
            extensibility: {
                'addtest' : false,
                    'prefixed' : false,
                    'teststyles' : false,
                    'testprops' : false,
                    'testallprops' : false,
                    'hasevents' : false,
                    'prefixes' : false,
                    'domprefixes' : false
            }
        },

        sass: {
            DemoPageBundle: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'web/frontend/css/style.css': resourcesPath+'public/scss/style.scss',
                    'web/frontend/css/ie8.css': resourcesPath+'public/scss/legacy/ie/ie8.scss',
                    'web/frontend/css/ie7.css': resourcesPath+'public/scss/legacy/ie/ie7.scss'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-svg2png');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks("grunt-modernizr");
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['sass', 'modernizr']);
};
