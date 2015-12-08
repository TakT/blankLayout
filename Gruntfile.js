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
					'build/assets/css/styles.css': ['src/assets/less/icons.less', 'src/assets/less/styles.less'],
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
				src: ['src/assets/less/*.less', 'src/assets/js/*.js', 'src/*.html', 'src/parts/*.html'],
			},
			options: {
				watchTask: true,
				reloadDelay: 300,
				proxy: 'projects/e-produce/shipilov/warner-films/build/',
			}
		},

		includereplace: {
			dev: {
				options: {
					// Task-specific options go here.
				},
				// Files to perform replacements and includes with
				src: './src/*.html',
				// Destination directory to copy files to
				dest: './build/',
				expand: true,
			},
			development: {
				files: [{
					cwd: 'src/',
					src: ['*.html'],
					dest: 'build/',
					expand: true,
				}]
			},
		},

		copy: {
			files: {
				cwd: 'src/', // set working folder / root to copy
				src: '**/assets/**', // copy all files and subfolders
				dest: 'build/', // destination folder
				expand: true, // required when using cwd
			}
		},

		watch: {
			options: {
				spawn: false,
				livereload: true,
			},

			scripts: {
				files: [
					'src/assets/js/*.js'
				],
				tasks: ['copy'],
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
			files: ['src/**'],
			tasks: ['includereplace:development', 'copy'],
		},
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-include-replace');

	// Default task(s).
	grunt.registerTask('default', ['less:dev', 'includereplace:development', 'copy', 'browserSync', 'watch']);
};