const {Router} = require('express')
const router = Router()
const authValidation = require('../config/auth.validation')
const authController = require('../controllers/auth.controller')

router.post('/login', authController.login)
router.post('/register', authValidation.registerValidadtion, authController.register)
router.post('/reset/:id', authController.reset)

module.exports = router
