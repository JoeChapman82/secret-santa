const csrf = require('csurf');
const config = require('../../config/main');

module.exports = (app) => {
    app.use(csrf({cookie: {maxAge: config.csrf.lifespan, httpOnly: true, signed: true, secure: config.csrf.secure}}));

    app.use((req, res, next) => {
        res.locals._csrf = req.csrfToken();
        next();
    });

    app.use((err, req, res, next) => {
        console.log(err.code);
        if (err.code !== 'EBADCSRFTOKEN') {
            return next(err);
        }
        res.clearCookie(config.session.cookieName);
        res.clearCookie('_csrf');
        res.status(403).redirect('/');
    });
};
