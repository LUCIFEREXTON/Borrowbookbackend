const express = require('express')
const router = express.Router()
const { showbooks, addbook, showonebook, changestatus } = require('../controller/bookdetail')

router.get('/books', showbooks)
router.post('/addbook', addbook)
router.get('/book/:id', showonebook)
router.post('/changestatus', changestatus)

module.exports = router