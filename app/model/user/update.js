const User = require('./user');

module.exports = {
    byId: (id, update) => User.findByIdAndUpdate(id, update, {new: true})
};
