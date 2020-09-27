const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const sgMail = require('@sendgrid/mail')

module.exports.register = async function (req, res) {
  try {
    const userExist = await User.findOne({email: req.body.email})
    sgMail.setApiKey(keys.SENDGRID_API_KEY)

    if (userExist) {
      return res.status(400).json({message: 'This user is already exist!'})
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    const newUser = await new User({
      name: req.body.name,
      secondName: req.body.secondName,
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone,
      password: hashedPassword
    }).save()

    const msg = {
      to: req.body.email,
      from: 'kolesnikthebest@gmail.com',
      subject: 'Registration',
      html: `<h1>Dear ${req.body.name}, your account has been created!</h1>`
    }

    res.status(201).json({message: 'User created'})
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
        res.status(400).json({token: `Bearer ${token}`})
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

module.exports.reset = async function(req, res) {

}
