'use strict';
const gulp = require('gulp');
const protractor = require('gulp-protractor').protractor;

// * we slice unused paths so Protractor args accept it
let args = process.argv.slice(3);
// * delete gulpfile args if created by WebStorm so Protractor args don't think we have two config files
if (args.indexOf('--gulpfile' === -1)) { args = []; }
// * keeps protractor from listening to custom args and throwing error
args.unshift('--disableChecks');

gulp.task('google-browserstack-mobile-chrome', function(done) {
	gulp.src([ './specDemo/*.spec.js' ])
		.pipe(protractor({ configFile: './config.js', args: args.concat([ '--bst',true , '--mob',true ]) }))
		.on('error', function(e) { throw e; })
		.on('end', done);
});

gulp.task('google-desktop-chrome', function(done) {
	gulp.src([ './specDemo/*.spec.js' ])
		.pipe(protractor({ configFile: './config.js', args }))
		.on('error', function(e) { throw e; })
		.on('end', done);
});