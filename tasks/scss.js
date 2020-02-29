const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const mqpacker = require('css-mqpacker'); // PostCSS | Объединение медиа запросов
const sortMqpacker = require('sort-css-media-queries'); // PostCSS | Правильная сортировка для mqpacker
const bs = require('browser-sync'); // Автоперезагрузка браузера

module.exports = ({src, dist, isProd}) => () => (
	gulp.src(src)
		.pipe($.plumber())
		.pipe($.if(!isProd, $.sourcemaps.init()))
		.pipe($.sassGlob())
		.pipe($.sass())
		.pipe($.postcss([
			mqpacker({
				sort: sortMqpacker
			})
		]))
		.pipe($.if(isProd, $.autoprefixer(['last 15 versions', '>1%'])))
		.pipe($.if(isProd, $.cssbeautify({
			indent: '\t'
		})))
		.pipe($.if(!isProd, $.sourcemaps.write()))
		.pipe(gulp.dest(dist))
		.pipe(bs.stream())
);