const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const del = require('del'); // Для удаления файлов и папок
const fs = require('fs'); // Чтение и запись файлов

module.exports = ({name: defaultName, dirBlocks, dirTemp, relBlocks, src}) => done => {
	const {util: {env}} = $;

	const name = env.name || env.n || defaultName; // Имя блока
	const comment = env.comment || env.cmt; // Комментарий для SCSS инклюда

	const dirCurrent = `${dirBlocks}/${name}`; // Полный путь до папки с текущим блоком
	const dirCurrentRel = `${relBlocks}/${name}`; // Относительный путь до папки с текущим блоком

	const keyScss = env.scss || env.s; // Ключ генерации SCSS файла
	const keyJs = env.js || env.j; // Ключ генерации JS файла
	const keyPugMixin = env.mixins || env.mixin || env.mix || env.m; // Ключ генерации PUG миксина
	const keyPugComp = env.components || env.component || env.comp || env.c; // Ключ генерации PUG компонента
	const keyPugPart = env.partials || env.partial || env.part || env.p; // Ключ генерации PUG части страницы
	const keyDataJson = env.json || env.o; // Ключ генерации JSON

	// Генерация SCSS при запуске без ключей
	if (!keyScss && !keyJs && !keyPugMixin && !keyPugComp && !keyPugPart && !keyDataJson) {
		if (fs.existsSync(`${dirBlocks}/${name}.scss`)) {
			printMsg('err', `Файл "${name}.scss" уже существует!`);
		} else if (fs.existsSync(`${dirBlocks}/${name}`)) {
			printMsg('err', `Папка "${name}" уже существует!`);
		} else if (fs.existsSync(`${dirBlocks}/${name}.js`)) {
			moveJsToFolder();
			addScss(dirCurrent, dirCurrentRel);
		} else {
			addScss(dirBlocks, relBlocks);
		}
	}
	// =====

	// Генерация SCSS и JS файлов
	if (keyScss) {
		if (fs.existsSync(dirCurrent)) {
			printMsg('err', `Папка "${name}" уже существует!`);
		} else if (keyJs) {
			fs.mkdirSync(dirCurrent);

			if (fs.existsSync(`${dirBlocks}/${name}.scss`)) {
				moveScssToFolder();
			} else {
				addScss(dirCurrent, dirCurrentRel);
			}

			if (fs.existsSync(`${dirBlocks}/${name}.js`)) {
				moveJsToFolder();
			} else {
				addJs(dirCurrent, dirCurrentRel);
			}
		} else {
			if (fs.existsSync(`${dirBlocks}/${name}.js`)) {
				moveJsToFolder();
				addScss(dirCurrent, dirCurrentRel);
			} else {
				if (fs.existsSync(`${dirBlocks}/${name}.scss`)) {
					printMsg('err', `Файл "${name}.scss" уже существует!`);
				} else {
					addScss(dirBlocks, relBlocks);
				}
			}
		}
	} else {
		if (keyJs) {
			if (fs.existsSync(dirCurrent)) {
				printMsg('err', `Папка "${name}" уже существует!`);
				return false;
			}

			if (fs.existsSync(`${dirBlocks}/${name}.scss`)) {
				moveScssToFolder();
				addJs(dirCurrent, dirCurrentRel);
			} else {
				if (fs.existsSync(`${dirBlocks}/${name}.js`)) {
					printMsg('err', `Файл "${name}.js" уже существует!`);
				} else {
					addJs(dirBlocks, relBlocks);
				}
			}
		}
	}
	// =====

	// Генерация PUG миксина
	if (keyPugMixin) {
		if (fs.existsSync(`${dirTemp}/mixins/${name}.pug`)) {
			printMsg('err', `Миксин "${name}.pug" уже существует!`);
		} else {
			addPugMixin(dirTemp);
		}
	}
	// =====

	// Генерация PUG компонента
	if (keyPugComp) {
		if (fs.existsSync(`${dirTemp}/components/${name}.pug`)) {
			printMsg('err', `Компонент "${name}.pug" уже существует!`);
		} else {
			addPugComp(dirTemp);
		}
	}
	// =====

	// Генерация PUG части страницы
	if (keyPugPart) {
		if (fs.existsSync(`${dirTemp}/partials/${name}.pug`)) {
			printMsg('err', `Включаемая область "${name}.pug" уже существует!`);
		} else {
			addPugPart(dirTemp);
		}
	}
	// =====

	// Генерация JSON файла
	if (keyDataJson) {
		const fName = name.replace(new RegExp('-', 'g'), '_');

		if (fs.existsSync(`${dirTemp}/data/${fName}.json`)) {
			printMsg('err', `Файл с данными "${fName}.json" уже существует!`);
		} else {
			addDataJson(dirTemp);
		}
	}

	// =====

	function addScss(path, relPath) {
		const
			str =
`$name: ${name};

.#{$name} {
\t
}`,
			pathToMain = `${src}/style.scss`, // Путь до диспетчера подключений
			placeIntoMain = '/* Blocks will be inserted here */', // Метка для вставки строки
			inc = `@import '${relPath}/${name}';`, // Строка для вставки
			cmt = comment ? ` // ${comment}` : ''; // Комментарий для SCSS инклюда

		fs.writeFileSync(`${path}/${name}.scss`, str);

		gulp.src(pathToMain)
			.pipe($.replace(
				placeIntoMain,
				`${inc}${cmt}
${placeIntoMain}`
			))
			.pipe(gulp.dest(file => file.base));

		printMsg('ok', `Файл "${name}.scss" создан!`);
	}

	function addJs(path, relPath) {
		const
			pathToMain = `${src}/script.js`, // Путь до диспетчера подключений
			placeIntoMain = '/* Blocks will be inserted here */', // Метка для вставки строки
			inc = `(function() {
\t\t//=require '${relPath}/${name}.js'
\t}());`;

		fs.writeFileSync(
			`${path}/${name}.js`,
			''
		);

		gulp.src(pathToMain)
			.pipe($.replace(
				placeIntoMain,
				`${inc}
\t${placeIntoMain}`
			))
			.pipe(gulp.dest(file => file.base));

		printMsg('ok', `Файл "${name}.js" создан!`);
	}

	function addPugMixin(path) {
		fs.writeFileSync(
			`${path}/mixins/${name}.pug`,
			`mixin ${name}(data)
\t`
		);

		printMsg('ok', `Миксин "${name}.pug" создан!`);
	}

	function addPugComp(path) {
		fs.writeFileSync(
			`${path}/components/${name}.pug`,
			''
		);

		printMsg('ok', `Компонент "${name}.pug" создан!`);
	}

	function addPugPart(path) {
		fs.writeFileSync(
			`${path}/partials/${name}.pug`,
			''
		);

		printMsg('ok', `Включаемая область "${name}.pug" создана!`);
	}

	function addDataJson(path) {
		const fName = name.replace(new RegExp('-', 'g'), '_');

		const str =
`{
\t"${fName}": [
\t\t{
\t\t\t
\t\t}
\t]
}`;

		fs.writeFileSync(`${path}/data/${fName}.json`, str);

		printMsg('ok', `Файл с данными "${fName}.json" создан!`);
	}

	function moveJsToFolder() {
		if (!fs.existsSync(dirCurrent)) {
			fs.mkdirSync(dirCurrent);
		}

		gulp.src(`${dirBlocks}/${name}.js`)
			.pipe(gulp.dest(dirCurrent));

		gulp.src(`${src}/script.js`)
			.pipe($.replace(
				`//=require '${relBlocks}/${name}.js'`,
				`//=require '${dirCurrentRel}/${name}.js'`,
			))
			.pipe(gulp.dest(file => file.base));

		printMsg('ok', `Файл "${name}.js" перенесён в папку "${dirCurrent}"!`);

		return del(`${dirBlocks}/${name}.js`);
	}

	function moveScssToFolder() {
		if (!fs.existsSync(dirCurrent)) {
			fs.mkdirSync(dirCurrent);
		}

		gulp.src(`${dirBlocks}/${name}.scss`)
			.pipe(gulp.dest(dirCurrent));

		gulp.src(`${src}/style.scss`)
			.pipe($.replace(
				`@import '${relBlocks}/${name}';`,
				`@import '${dirCurrentRel}/${name}';`,
			))
			.pipe(gulp.dest(file => file.base));

		printMsg('ok', `Файл "${name}.scss" перенесён в папку "${dirCurrent}"!`);

		return del(`${dirBlocks}/${name}.scss`);
	}

	function printMsg(state, str) {
		const
			reset = "\x1b[0m",
			fgColor = (state === 'ok') ? '\x1b[32m' : (state === 'err') ? '\x1b[31m' : reset;

		console.log(`${fgColor}${str}${reset}`);
	}

	done();
};
