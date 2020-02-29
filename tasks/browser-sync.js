const bs = require('browser-sync'); // Автоперезагрузка браузера

module.exports = ({dist}) => () => {
	bs({
		server: dist,
		notify: false,
		ghostMode: false
	});
};