const {Router} = require('express')
const router = Router()
const cvController = require('../controllers/cv.controller')

router.post('/createCV', cvController.createCV)

module.exports = router
