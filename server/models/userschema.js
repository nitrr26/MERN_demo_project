const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: ture
    },
    email: {
        type: String,
        required: ture
    },
    phone: {
        type: Number,
        required: ture
    },
    work: {
        type: String,
        required: ture
    },
    password: {
        type: String,
        required: ture
    },
    cpassword: {
        type: String,
        required: ture
    }

})

const User = mongoose.model('USER', userSchema);

module.exports = User;