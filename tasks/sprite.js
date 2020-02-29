const gulp = require('gulp');
const sprite = require('gulp.spritesmith'); // Создание спрайтов

module.exports = ({src, fName, dist}) => done => {
	const data = gulp.src(src)
		.pipe(sprite({
			imgName: `${fName}.png`,
			cssName: `${fName}.css`
		}));

	data.img.pipe(gulp.dest(dist)); // Картинка
	data.css.pipe(gulp.dest(dist)); // Стили

	done();
};