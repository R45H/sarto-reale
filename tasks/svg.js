const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const bs = require('browser-sync'); // Автоперезагрузка браузера

module.exports = ({src, dist, isProd}) => () => (
	gulp.src(src)
		.pipe($.newer(dist))
		.pipe($.if(isProd, $.svgmin({
			plugins: [{
				mergePaths: false
			}]
		})))
		.pipe(gulp.dest(dist))
		.pipe(bs.stream())
);