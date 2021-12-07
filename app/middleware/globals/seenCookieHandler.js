const config = require('../../config/main');

module.exports = (req, res, next) => {
    if(req.signedCookies && !req.signedCookies['seen cookie message']) {
        console.log('In here!');
        res.locals.showCookieMessage = true;
        res.cookie('seen cookie message', true, { expires: new Date(253402300000000), httpOnly: true, signed: true, secure: config.session.secure });
    }
    return next();
}