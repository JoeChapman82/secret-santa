const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createUser = require('../model/user/create');
const findUsers = require('../model/user/read');
const updateUser = require('../model/user/update');
const config = require('../config/main');
const saltRounds = 12;
const randomNumber = require('../helpers/randomNumber');
const encrypt = require('../helpers/encryption/encrypt');
const decrypt = require('../helpers/encryption/decrypt');

module.exports = (app) => {
    // admin routes
    app.get('/admin/ho-ho-home', (req, res) => res.render('admin/ho-ho-home'));
    app.get('/admin/create-team', (req, res) => res.render('admin/create-team'));
    app.get('/admin/view-teams', async (req, res, next) => {
        let teamNames = await findUsers.getTeams();
        let teams = {};
        for await (const teamName of teamNames) {
            let members = await findUsers.forTeamView(teamName);
            teams[teamName] = members.map((x) => x.username);
        }
        res.locals.teams = teams;
        return res.render('admin/view-teams');
    });
    app.post('/admin/create-team', [
        async (req, res, next) => {
            try {
                let names = req.body.names.split(',');
                let passwords = req.body.passwords.split(',');
                for await (const [index, value] of names.entries()) {
                    const hash = await bcrypt.hash(passwords[index], saltRounds);
                    await createUser(value, hash, req.body.teamName);
                }
                return res.render('admin/create-team');
            } catch(error) {
                console.log(error);
                return res.redirect('/errors/gone-wrong');
            }

        }
    ]);
    // user routes
    app.get('/user/ho-ho-home', async (req, res, next) => {
        let user = await findUsers.toAuthenticate(res.locals.userToken.username);
        if(user.isSantaFor) {
            res.locals.hasPicked = true;
            res.locals.secretSantaDetails = await findUsers.forSanta(user.isSantaFor);
            if(res.locals.secretSantaDetails?.address) {
                res.locals.secretSantaDetails.address = decrypt(res.locals.secretSantaDetails.address);
            }
        } else {
            res.locals.hasPicked = false;
        }
        res.render('user/ho-ho-home')
    });
    app.post('/user/ho-ho-home', async (req, res, next) => {
        try {
            const user = await findUsers.toAuthenticate(res.locals.userToken.username);
            const team  = user.team;
            const teamMemberDetails = await findUsers.byTeam(team);
            const teamMembers = teamMemberDetails.map((x) => x.username);
            const selectedTeamMembers = teamMemberDetails.map((member) => member.isSantaFor).filter(Boolean);
            const availableTeamMembers = teamMembers.filter((member) => !selectedTeamMembers.includes(member));
            if(availableTeamMembers.includes(user.username)) {
                availableTeamMembers.splice(availableTeamMembers.indexOf(user.username), 1); 
            }
            if(availableTeamMembers.length === 0) {
                console.log('No team members left :(');
            }
            const selectedTeamMember = availableTeamMembers[randomNumber(0, availableTeamMembers.length - 1)];
            await updateUser.byId(res.locals.userToken.sub, {isSantaFor: selectedTeamMember});
            return res.redirect('/user/ho-ho-home')
        } catch(error) {
            console.log(error);
            return res.redirect('/errors/gone-wrong');
        }
    });
    app.get('/user/update-details', (req, res, next) => res.render('user/update-details'));
    app.post('/user/update-details', async (req, res, next) => {
        if(!req.body.newPassword || !req.body.address) {
            return res.redirect('/user/update-details');
        }
        try {
            const hash = await bcrypt.hash(req.body.newPassword, saltRounds);
            await updateUser.byId(res.locals.userToken.sub, {password: hash, address: encrypt(req.body.address), hasDefaultPassword: false});
            let claims = { sub: res.locals.userToken.sub, iss: process.env.JWT_ISSUER_URL, permissions: res.locals.userToken.permissions, username: res.locals.userToken.username, hasDefaultPassword: false, team: res.locals.userToken.team };
            const createdToken = jwt.sign(claims, process.env.JWT_SECRET, {
                expiresIn: config.session.cookieLifespan
            });
            res.cookie(config.session.cookieName, createdToken, { maxAge: config.session.cookieLifespan, httpOnly: true, signed: true, secure: config.session.secure });
            return res.redirect('/user/ho-ho-home');
        } catch(error) {
            console.log(error);
            return res.redirect('/errors/gone-wrong');
        }

    });
    app.get('/errors/404', (req, res) => res.render('errors/not-found'));
    app.get('/errors/gone-wrong', (req, res) => res.render('errors/gone-wrong'));
    app.all('*', (req, res) => res.redirect('/errors/404'));
    return app;
}