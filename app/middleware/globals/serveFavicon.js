const path = require('path');
const favicon = require('serve-favicon');

module.exports = (app) => app.use(favicon(path.join(process.cwd(), '/app/assets/images', 'favicon.ico')));
