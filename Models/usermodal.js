const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    }
})

userSchema.methods.hashgenerator = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

userSchema.methods.validatepassword = function(password) {
    return bcrypt.compareSync(password, this.password)
}
module.exports = mongoose.model('User', userSchema)