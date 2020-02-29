const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const bs = require('browser-sync'); // Автоперезагрузка браузера

module.exports = ({src, dist}) => () => (
	gulp.src(src)
		.pipe($.newer(dist))
		.pipe(gulp.dest(dist))
		.pipe(bs.stream())
);