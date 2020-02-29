const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const stylelint = require('stylelint'); // Для проверки кода
const reporter = require('postcss-reporter'); // PostCSS | Для вывода сообщений от других плагинов
const scssSyntax = require('postcss-scss'); // PostCSS | Синтаксис SCSS

module.exports = ({src}) => () => (
	gulp.src(src)
		.pipe($.plumber())
		.pipe($.postcss([
			stylelint(),
			reporter({
				clearReportedMessages: true
			})
		], {syntax: scssSyntax}))
);