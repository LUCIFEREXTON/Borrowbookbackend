const User = require('../Models/usermodal')
const jwt = require('jsonwebtoken')
const Book = require('../Models/book.model')

exports.userupdate = (req, res) => {
    if (req.headers.token) {
        jwt.verify(req.headers.token, process.env.SECRET, (err, payload) => {
            if (err) {
                console.log('Err:', err)
                return res.status(500).json({
                    error: 'Internal Server Error'
                })
            }
            payload = {...payload._doc }
            const { _id } = payload
            const { name, contact } = req.body
            if (name && contact && contact.length >= 10) {
                User.findOneAndUpdate({ _id }, { name: req.body.name, contact: req.body.contact }, { new: true })
                    .then(user => {
                        if (!err && user) {
                            user.password = ''
                            const token = jwt.sign({...user }, process.env.SECRET, { expiresIn: '7d' })
                            console.log('update')
                            return res.status(202).json({
                                token,
                                user
                            })
                        }
                        return res.status(401).json({
                            error: 'Enter Details Carefully'
                        })
                    })
                    .catch(err => {
                        return res.status(500).json({
                            error: 'Server Error'
                        })
                    })
            } else {
                return res.status(401).json({
                    error: 'Enter Details Carefully'
                })
            }
        })
    } else {
        console.log('Err:')
        return res.status(403).json({
            error: 'Not Authrised To Submit Book'
        })
    }
}


exports.listedbooks = (req, res) => {
    if (req.headers.token) {
        jwt.verify(req.headers.token, process.env.SECRET, (err, payload) => {
            if (err) {
                console.log('Err:', err)
                return res.status(500).json({
                    error: 'Internal Server Error'
                })
            }
            payload = {...payload._doc }
            const { _id } = payload
            Book.find({ user: _id }, 'title available')
                .then(books => {
                    return res.status(200).json({
                        books
                    })
                })
                .catch(err => {
                    return res.status(500).json({
                        error: 'Internal Server Error'
                    })
                })
        })
    } else {
        console.log('Err:')
        return res.status(403).json({
            error: 'Not Authrised To Submit Book'
        })
    }
}