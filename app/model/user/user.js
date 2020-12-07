const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        index: true
    },
    role: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User'
    },
    password: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true,
        index: true
    },
    hasDefaultPassword: {
        type: Boolean,
        default: true
    },
    address: {
        type: String,
        default: null
    },
    isSantaFor: {
        type: String,
        unique: true,
        sparse: true
    }
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
