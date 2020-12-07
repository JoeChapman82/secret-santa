const redirects = require('../../controllers/redirects');
const config = require ('../../config/main');

module.exports = (req, res, next) => {
    if(req.signedCookies[config.session.cookieName] === undefined || res.locals.noToken) {
        return next();
    } else {
        return redirects.adminDashboard(req, res);
    }
};
