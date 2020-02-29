const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

module.exports = ({src}) => () => (
	gulp.src(src)
		.pipe($.w3cjs())
		.pipe($.w3cjs.reporter())
);