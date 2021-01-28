const express = require('express')
const router = express.Router()
const { userupdate, listedbooks } = require('../controller/user')

router.post('/updatedetails', userupdate)
router.get('/listedbooks', listedbooks)

module.exports = router