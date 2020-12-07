const jwt = require('jsonwebtoken');
const redirects = require('../../controllers/redirects');
const assignToken = require('../assignToken.js');
const config = require ('../../config/main');

module.exports = (req, res, next) => {
    jwt.verify(res.locals.createdToken, process.env.JWT_SECRET, (err, decodedToken) => {
        if(err) {
            if(req.signedCookies[config.session.cookieName]) {
                res.clearCookie(config.session.cookieName);
                return redirects.index(req, res);
            } else {
                redirects.index(req, res);
            }
        } else {
            res.locals.userToken = decodedToken;
            next();
        }
    });
};
