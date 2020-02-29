const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const pngquant = require('imagemin-pngquant'); // Для работы с PNG
const bs = require('browser-sync'); // Автоперезагрузка браузера

module.exports = ({src, dist, isProd}) => () => (
	gulp.src(src)
		.pipe($.newer(dist))
		.pipe($.if(isProd, $.imagemin({
			interlaced: true,
			progressive: true,
			use: [pngquant()]
		})))
		.pipe(gulp.dest(dist))
		.pipe(bs.stream())
);