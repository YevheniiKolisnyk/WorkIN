const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const sgMail = require('@sendgrid/mail')
const User = require('../models/User')
const keys = require('../config/keys')

module.exports.register = async function (req, res) {
  try {
    const userExist = await User.findOne({email: req.body.email})
    sgMail.setApiKey(keys.SENDGRID_API_KEY)

    if (userExist) {
      return res.status(400).json({message: 'This user is already exist'})
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    const {firstName, lastName, email, country, state, city, phone} = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(422).json({message: errors.array()})
    }

    const newUser = await new User({
      firstName,
      lastName,
      email,
      country,
      state,
      city,
      phone,
      password: hashedPassword
    }).save()

    const msg = {
      to: req.body.email,
      from: keys.email_from,
      subject: 'Registration',
      html: `<h1>Dear ${req.body.name}, your account has been created!</h1>`
    }

    res.status(201).json(newUser)
    await sgMail.send(msg)
  } catch (e) {
    console.log(e)
  }
}

module.exports.login = async function (req, res) {
  try {
    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
      const validPass = await bcrypt.compare(req.body.password, candidate.password)
      if (validPass) {
        const token = jwt.sign({
          email: candidate.email,
          userId: candidate._id
        }, keys.JWT)
        res.status(200).json({token: `Bearer ${token}`})
      } else {
        return res.status(400).json({message: "Invalid password"})
      }
    } else {
      return res.status(400).json({message: 'This user does not exist'})
    }
  } catch (e) {
    console.log(e)
  }
}

module.exports.reset = async function (req, res) {

}
