const findUsers = require('../model/user/read');
const createUser = require('../model/user/create');
const bcrypt = require('bcrypt');
const saltRounds = 12;
const config = require('../config/main');
const jwt = require('jsonwebtoken');

module.exports = (app) => {
    app.get('/', (req, res) => res.render('index'));
    app.post('/', [
        async (req, res, next) => {
            let totalUsers = await findUsers.count({});
            if(!totalUsers) {
                // initial user path
                try {
                    const hash = await bcrypt.hash(req.body.password, saltRounds);
                    await createUser(req.body.name, hash, 'Admin', false, 'Admin');
                    res.send('Success!');
                } catch(error) {
                    console.log(error);
                    return res.redirect('/errors/gone-wrong');
                }
            } else {
                // Normal path
                try {
                    if(!req.body.name || !req.body.password) {
                        console.log('No username or password entered');
                        return res.redirect('/errors/santa-says-no');
                    }
                    let user = await findUsers.toAuthenticate(req.body.name);
                    if(!user) {
                        console.log('User not located');
                        return res.redirect('/errors/santa-says-no');
                    } else {
                        const isMatching = await bcrypt.compare(req.body.password, user.password);
                        if(isMatching) {
                            let claims = { sub: user._id, iss: process.env.JWT_ISSUER_URL, permissions: user.role, username: user.username, hasDefaultPassword: user.hasDefaultPassword, team: user.team };
                            const createdToken = jwt.sign(claims, process.env.JWT_SECRET, {
                                expiresIn: config.session.cookieLifespan
                            });
                            res.cookie(config.session.cookieName, createdToken, { maxAge: config.session.cookieLifespan, httpOnly: true, signed: true, secure: config.session.secure });
                            if(user.role === 'Admin') {
                                return res.redirect('/admin/ho-ho-home');
                            } else {
                                return res.redirect('/user/ho-ho-home');
                            }
                        } else {
                            console.log('Password mismatch');
                            return res.redirect('/errors/santa-says-no');
                        }
                    }
                } catch(error) {
                    console.log(error);
                    return res.redirect('/errors/gone-wrong');
                }

            }
        }
    ]);
    app.get('/errors/santa-says-no', (req, res) => res.render('errors/santa-says-no'));
    return app;
};
