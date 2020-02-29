const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

module.exports = ({src, fName, dist}) => () => {
	if (global.watch) {
		global.watch = 'json';
	}

	return gulp.src(src)
		.pipe($.plumber())
		.pipe($.jsonmerge(fName))
		.pipe(gulp.dest(dist));
};