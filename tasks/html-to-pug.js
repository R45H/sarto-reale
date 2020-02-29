const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

module.exports = ({src}) => () => (
	gulp.src(`${src}/index.html`)
		.pipe($.html2pug({
			tabs: true,
			fragment: true
		}))
		.pipe(gulp.dest(src))
);