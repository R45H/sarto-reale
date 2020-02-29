const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const bs = require('browser-sync'); // Автоперезагрузка браузера

module.exports = ({src, fName, dist, isProd}) => () => (
	gulp.src(src)
		.pipe($.if(isProd, $.svgmin()))
		.pipe($.svgSprite({
			mode: {
				symbol: { // Используется тег symbol
					dest: '.', // Отключение папки symbol
					sprite: fName // Имя файла
				}
			},
			shape: {
				id: {
					// Добавляем префикс svg- к ID
					generator: name => `svg-${name.slice((name.lastIndexOf('\\') + 1) || 0, name.indexOf('.'))}`
				}
			}
		}))
		.pipe(gulp.dest(dist))
		.pipe(bs.stream())
);