module.exports = (app) => {
    app.use((req, res, next) => {
        res.locals.currentYear = new Date().getFullYear();
        return next();
    });
    return app;
}