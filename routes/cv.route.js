const {Router} = require('express')
const router = Router()
const cvController = require('../controllers/cv.controller')
const upload = require('../middlewares/upload')
const passport = require('passport')


router.post(
    '/createCV', passport.authenticate('jwt', {session: false}),
    upload.single('cvUserPic'),
    cvController.createCV)

module.exports = router
