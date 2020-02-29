const del = require('del'); // Для удаления файлов и папок

module.exports = ({dist}) => () => del(dist);