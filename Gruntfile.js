module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		less: { // Task less
			options: {
				expand: true
			},
			dev: { // Target
				options: {
					strictMath: true,
					optimization: true,
				},
				files: {
					'src/assets/css/styles.css': ['src/assets/less/icons.less', 'src/assets/less/styles.less'],
					// 'src/*.html': ['build/*.html'],
				},
			},
			release: { // Target
				options: {
					strictMath: true,
					yuicompress: true,
				},
				files: {
					'build/assets/css/styles.css': ['src/assets/less/icons.less', 'src/assets/less/styles.less'],
				}
			}
		},

		browserSync: {
			bsFiles: {
				src: ['src/assets/less/*.less', 'src/*.html', ],
			},
			options: {
				watchTask: true,
				reloadDelay: 300,
				proxy: 'projects/e-produce/shipilov/eukanub/src/',
			}
		},

		includereplace: {
			dev: {
				options: {
					// Task-specific options go here.
				},
				// Files to perform replacements and includes with
				src: 'src/parts/*.html',
				// Destination directory to copy files to
				dest: 'src/'
			},
			development: {
				files: [{
					src: ['parts/*.html'],
					dest: './',
					expand: true
				}]
			},
		},

		watch: {
			options: {
				spawn: false,
				livereload: true,
			},

			scripts: {
				files: [
					'src/assets/js/*.js'
				]
			},

			styles: {
				files: [
					'src/assets/less/*.less',
					'src/*.html',
				],
				tasks: [
					'less:dev'
				]
			},
			tasks: ['less', ],
		},
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');
	// grunt.loadNpmTasks('grunt-include-replace');

	// Default task(s).
	grunt.registerTask('default', ['less', 'browserSync', 'watch']);

};