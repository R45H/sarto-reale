const $ = require('gulp-load-plugins')();
const fs = require('fs'); // Чтение и запись файлов

module.exports = (
	{
		name: defaultName,
		title: defaultTitle,
		layout: defaultLayout,
		pageInit: defaultPageInit,
		page: defaultPage
	}) => done => {
	const {util: {env}} = $;

	const name = env.name || env.n || defaultName; // Имя файла
	const title = env.title || env.t || defaultTitle; // Заголовок страницы
	const layout = env.layout || env.l || defaultLayout; // Шаблон страницы

	const string =
`extends layouts/${layout}

block vars
\t-
\t\tpage = {
\t\t\ttitle: '${title}',
\t\t\tlink: '${name}',
\t\t}

block content
\tinclude pages/${name}`;

	const pageInit = `${defaultPageInit}/${name}.pug`; // Путь к странице с параметрами
	const page = `${defaultPage}/${name}.pug`; // Путь к странице с вёрсткой

	if ((fs.existsSync(pageInit)) || (fs.existsSync(page))) {
		printMsg('err', `Страница "${name}.pug" уже существует!`);
	} else {
		fs.writeFileSync(pageInit, string);
		fs.writeFileSync(page, '');

		setTimeout(() => {
			fs.utimesSync(pageInit, new Date, new Date);
		}, 0);

		printMsg('ok', `Страница "${name}.pug" создана!`);
	}

	function printMsg(state, str) {
		const reset = "\x1b[0m";
		const fgColor = (state === 'ok') ? '\x1b[32m' : (state === 'err') ? '\x1b[31m' : reset;

		console.log(`${fgColor}${str}${reset}`);
	}

	done();
};