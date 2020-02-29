const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const fs = require('fs'); // Чтение и запись файлов
const bs = require('browser-sync'); // Автоперезагрузка браузера

// Для инкрементальной сборки Pug
const emitty = require('emitty').setup('app/templates', 'pug', {
	makeVinylFile: true
});

module.exports = ({src, json, isProd, dist}) => () => (
	new Promise((resolve, reject) => {
		const sourceOptions = global.watch ? {read: false} : {};

		emitty.scan(global.emittyChangedFile).then(() => {
			gulp.src(src, sourceOptions)
				.pipe($.plumber())
				.pipe($.if(global.watch === true, emitty.filter(global.emittyChangedFile)))
				.pipe($.data(() => JSON.parse(fs.readFileSync(json))))
				.pipe($.pug())
				.pipe($.if(isProd, $.jsbeautifier({
					indent_char: '\t',
					indent_size: 1
				})))
				.pipe(gulp.dest(dist))
				.pipe(bs.stream())
				.on('end', resolve)
				.on('error', reject);
		});

		if (global.watch === 'json') {
			global.watch = true;
		}

		resolve();
	})
);