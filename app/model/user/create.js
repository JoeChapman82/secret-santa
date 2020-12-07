const User = require('./user');

module.exports = (username, password, team, hasDefaultPassword = true, role = 'User') => {
    const user = new User({ username, password, team, role, hasDefaultPassword });
    return user.save();
};
