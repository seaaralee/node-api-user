const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    confpassword: {
        type: String
    },
    resetPasswordLink: {
        data: String,
        default: ''
    }
})

module.exports = mongoose.model('user', userSchema);