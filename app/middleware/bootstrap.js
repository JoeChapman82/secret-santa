const requireDir = require('require-dir');
const globals = requireDir('./globals');
const unprotectedRoutes = require('../routes/unprotectedRoutes');
const routes = require('../routes/routes');
const authorisation = require('./authorisation/main');
const roleAuthorisation = require('./authorisation/roleAuthorisation');

module.exports = (app) => {
    globals.helmet(app);
    globals.static(app);
    globals.trustProxy(app);
    globals.serveFavicon(app);
    globals.nunjucks(app);
    globals.cookieParser(app);
    globals.bodyParser(app);
    globals.csrf(app);
    app.use(globals.defineActiveView);
    globals.setCurrentYear(app);
    unprotectedRoutes(app);
    app.use(authorisation);
    app.all('/admin/*', roleAuthorisation.admin);
    app.all('/user/*', roleAuthorisation.user);
    routes(app);
    app.use(globals.errorHandler);
    return app;
};
