const jwt = require('jsonwebtoken')
const Book = require('../Models/book.model')
const User = require('../Models/usermodal')
exports.showbooks = (req, res) => {

}
exports.addbook = (req, res) => {
    if (req.headers.token) {
        jwt.verify(req.headers.token, process.env.SECRET, (err, payload) => {
            if (err) {
                console.log('Err:', req.body.title)
                return res.status(500).json({
                    error: 'Internal Server Error'
                })
            }
            payload = {...payload._doc }
            const { _id } = payload
            // req.body.authors = req.body.authors.split(',')
            // req.body.categories = req.body.categories.split(',')
            const book = new Book({...req.body, user: _id })
            book.save()
                .then(book => {
                    return res.status(201).json({
                        status: 'OK'
                    })
                })
                .catch(err => {
                    console.log('Err:', req.body.title)
                    return res.status(403).json({
                        error: 'Wrong Details'
                    })
                })
        })
    } else {
        console.log('Err:', req.body.title)
        return res.status(403).json({
            error: 'Not Authrised To Submit Book'
        })
    }
}
exports.showonebook = (req, res) => {

}
exports.changestatus = (req, res) => {

    const { id } = req.body

    Book.findById(id)
        .then(book => {
            book.available = !book.available
            book.save()
                .then(book => {
                    return res.status(200).json({
                        status: 'OK'
                    })
                })
                .catch(err => {
                    return res.status(500).json({
                        error: 'Database Issue'
                    })
                })
        })
        .catch(err => {
            return res.status(500).json({
                error: 'Server Error'
            })
        })
}