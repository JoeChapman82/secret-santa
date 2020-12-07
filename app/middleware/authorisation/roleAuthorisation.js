const findHome = require('../findHome');

module.exports = {
    admin: (req, res, next) => {
        return res.locals.userToken.permissions === 'Admin' ? next() : findHome(req, res, next);
    },
    user: (req, res, next) => {
        if(res.locals.userToken.hasDefaultPassword && req.url !== '/user/update-details') {
            return res.redirect('/user/update-details');
        }
        return res.locals.userToken.permissions === 'User' ? next() : res.redirect('/');
    }
};
