const {Router} = require('express')
const passport = require('passport')
const router = Router()
const profileController = require('../controllers/profile.controller')
const upload = require('../middlewares/upload')

router.get(
    '/',
    passport.authenticate('jwt', {session: false}),
    profileController.getAll
)

router.get(
    '/getUser',
    passport.authenticate('jwt', {session: false}),
    profileController.getUser
)

router.post(
    '/cv/:id',
    passport.authenticate('jwt', {session: false}),
    upload.single('cv'),
    profileController.addCv
)

router.patch(
    '/:id',
    passport.authenticate('jwt', {session: false}),
    upload.single('userpic'),
    profileController.update
)


module.exports = router
