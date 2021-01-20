const {Router} = require('express')
const router = Router()
const passport = require('passport')
const vacancyController = require('../controllers/vacancy.controller')
const upload = require('../middlewares/upload')

router.get('/searchByTags', vacancyController.searchByTags)
router.get('/', vacancyController.getAll)
router.get('/search', vacancyController.search)
router.get('/:id', vacancyController.getById)




router.post(
    '/create',
    passport.authenticate('jwt', {session: false}),
    upload.single('companyPic'),
    vacancyController.create
)

router.post(
    '/:id/subscribe',
    passport.authenticate('jwt', {session: false}),
    vacancyController.subscribe
)
router.post(
    '/:id/apply',
    passport.authenticate('jwt', {session: false}),
    vacancyController.apply
)
router.delete(
    '/:id',
    passport.authenticate('jwt', {session: false}),
    vacancyController.delete
)

module.exports = router
