const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const bs = require('browser-sync'); // Автоперезагрузка браузера

module.exports = ({src, dist, isProd}) => () => (
	gulp.src(src)
		.pipe($.plumber())
		.pipe($.if(!isProd, $.sourcemaps.init()))
		.pipe($.include())
		.pipe($.if(isProd, $.jsbeautifier({
			indent_char: '\t',
			indent_size: 1
		})))
		.pipe($.if(!isProd, $.sourcemaps.write()))
		.pipe(gulp.dest(dist))
		.pipe(bs.stream())
);