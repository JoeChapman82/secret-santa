const User = require('./user');

module.exports = {
    all: () => User.find({}, 'username role email'),
    count: (query) => User.countDocuments(query),
    dump: () => User.find({}),
    byTeam: (team) => User.find({ team }, 'username team isSantaFor'),
    byId: (id) => User.findById(id),
    byUsername: (username) => User.findOne({ username }, 'username'),
    forSanta: (username) => User.findOne({ username }, 'username address'),
    forTeamView: (team) => User.find({ team }, 'username'),
    byEmail: (email) => User.findOne({ email }),
    toAuthenticate: (username) => User.findOne({ username }),
    getTeams: () => User.distinct('team')
};
