const User = require('../Models/usermodal')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
exports.signup = (req, res) => {
    let { name, email, password, contact } = req.body
        // const { header } = req
    if (!name || !email || !password || !contact) {
        return res.status(422).json({
            error: 'Fill All Form Data'
        })
    }

    email = email.toLowerCase();
    User.findOne({ email })
        .then(preuser => {
            if (preuser) {
                return res.status(403).json({
                    error: 'User with This Email Already Exist'
                })
            } else {
                const user = new User({ name, email, password, contact })
                bcrypt.hash(password, 8).then(hash => {
                    user.password = hash;
                    user.save()
                        .then(user => {
                            if (user) {
                                user.password = ''
                                const token = jwt.sign({...user }, process.env.SECRET, { expiresIn: '7d' })
                                return res.status(201).json({
                                    token,
                                    user
                                })
                            } else {
                                console.log('User Save catch ', err)
                                return res.status(500).json({
                                    error: 'Internal Server Error'
                                })
                            }
                        })
                        .catch(err => {
                            console.log('user catch ', err)
                            return res.status(500).json({
                                error: 'Internal Server Error'
                            })
                        })
                });
            }
        })
        .catch(err=>{
            console.log('register user catch ', err)
            return res.status(409).json({
                error: 'Internal Server Error'
            })
        })
}


exports.login = async(req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(422).json({
            error: 'Fill All Form Data'
        })
    }

    User.findOne({ email })
        .exec((err, user) => {
            if (err) {
                console.log('login user catch ', err)
                return res.status(500).json({
                    error: 'Internal Server Error'
                })
            } else if (user) {
                if (user.validatepassword(password)) {
                    user.password = ''
                    const token = jwt.sign({...user }, process.env.SECRET, { expiresIn: '7d' })
                    console.log('login')
                    return res.status(202).json({
                        token,
                        user
                    })
                } else {
                    return res.status(401).json({
                        error: 'Email or Password not correct'
                    })
                }

            } else {
                return res.status(401).json({
                    error: 'Email or Password not correct'
                })
            }
        })
}