const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true,
        min: 8
    },

    otp: {
        type: String
    },

    isActive: {
        type: Boolean,
        default: false
    },

    created_date: {
        type: Date,
        default: Date.now()
    }
})

userSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, 10)
    next()
})

const user = mongoose.model('User', userSchema)

module.exports = user