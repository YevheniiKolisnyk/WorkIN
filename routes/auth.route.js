const {Router} = require('express')
const router = Router()
const authController = require('../controllers /auth.controller')

router.post('/login', authController.login)
router.post('/register', authController.register)
router.post('/reset/:id', authController.reset)

module.exports = router
