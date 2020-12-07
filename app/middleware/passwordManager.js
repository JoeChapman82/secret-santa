const bcrypt = require('bcrypt');
const saltRounds = 12;

module.exports = {
    hashPassword: async (req, res, next) => {
        let password = typeof req.body.newPassword === 'undefined' ? req.body.password : req.body.newPassword;
        try {
            const hash = await bcrypt.hash(password, saltRounds);
            res.locals.hash = hash;
            return next();
        } catch(error) {
            console.log(error);
            return res.redirect('/errors/gone-wrong');
        }
    },
    comparePassword: async (req, res, next) => {
        try {
            const isMatching = await bcrypt.compare(req.body.password, res.locals.user.password);
            if(isMatching) {
                return next();
            } else {
                res.locals.errors = {
                    name: "Unknown name",
                    password: "Unknown password"
                };
                return res.render('index');
            }
        } catch(error) {
            console.log(error);
            return res.redirect('/errors/gone-wrong');
        }
    }
};
