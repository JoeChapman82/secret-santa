const jwt = require('jsonwebtoken');
const config = require('../config/main');

module.exports = {
    sessionToken: async (req, res, next) => {
        let claims = {
            sub: res.locals.user._id,
            iss: process.env.JWT_ISSUER_URL,
            permissions: res.locals.user.role,
            username: res.locals.user.username,
            email: res.locals.user.email,
            hasDefaultPassword: res.locals.user.hasDefaultPassword
        };
        try {
            const createdToken = jwt.sign(claims, process.env.JWT_SECRET, {
                expiresIn: config.session.cookieLifespan
            });
            res.locals.createdToken = createdToken;
            // Send the the token in a cookie
            res.locals.tempToken = {
                sub: res.locals.user._id,
                permissions: res.locals.user.role
            };
            res.cookie(config.session.cookieName, createdToken, { maxAge: config.session.cookieLifespan, httpOnly: true, signed: true, secure: config.session.secure });
            next();
        } catch(error) {
            console.log(err);
            return res.redirect('errors/gone-wrong');
        }

    },
    newUserToken: async (req, res, next) => {
        let claims = {
            sub: {
                email: req.body.email
            },
            iss: process.env.JWT_ISSUER_URL,
            permissions: {
                newUserRole: 'Admin'
            }
        };
        try {
            res.locals.newUserToken = createdToken;
            next();
        } catch(error) {
            console.log(err);
            redirects.goneWrong(req, res);
        }
        const createdToken = await jwt.sign(claims, process.env.JWT_SECRET, {
            expiresIn: config.jwtLifespan
        });
    }
};
