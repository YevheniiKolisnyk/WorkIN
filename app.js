const express = require('express')
const app = express()
const passport = require('passport')
const mongoose = require('mongoose')
const cors = require('cors')
const passportMiddleware = require('./middlewares/passport')
const authRoute = require('./routes/auth.route')
const vacancyRoute = require('./routes/vacancy.route')
const cvRoute = require('./routes/cv.route')
const profileRoute = require('./routes/profile.route')
const keys = require('./config/keys')

mongoose.connect(keys.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
})
    .then(() => console.log('MongoDB connected'))
    .catch(e => console.log(e))

app.use('/uploads', express.static('uploads'))
app.use(passport.initialize())
passportMiddleware(passport)

app.use(express.json())
app.use(cors())

app.use('/api/auth', authRoute)
app.use('/api/vacancy', vacancyRoute)
app.use('/api/profile', profileRoute)
app.use('/api/cv', cvRoute)

module.exports = app
