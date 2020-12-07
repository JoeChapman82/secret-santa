const path = require('path');
const nunjucks = require('nunjucks');
const requireDir = require('require-dir');
const nunjucksFilters = requireDir('./nunjucksFilters');
const isDevEnvironment = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'testing';

module.exports = (app) => {

    app.set('view engine', 'njk');
    let nunjucksEnv = nunjucks.configure(path.join(process.cwd(), '/app/views'), {
        autoescape: true,
        express: app,
        noCache: !isDevEnvironment,
        watch: isDevEnvironment
    });

    Object.entries(nunjucksFilters).forEach(([key, value]) => {
        nunjucksEnv.addFilter(key, value);
    });

    return app;

};
