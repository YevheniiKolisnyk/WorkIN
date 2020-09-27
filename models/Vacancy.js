const mongoose = require('mongoose')
const moment = require('moment')

const vacancyScheme = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true,
  },
  expiryTime: {
    type: Date,
    required: true
  },
  contractType: {
    type: String,
    required: true
  },
  workTime: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  postingDate: {
    type: Date,
    default: moment()
  },
  description: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  companyPic: {
    type: String,
    default: '/uploads/companyPics/default.png'
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'Users'
  },
  applicants: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: 'Users'
      },
      cvSrc: {
        type: String,
        required: true
      }
    }
  ],
  tags: [
    {
      type: String
    }
  ]

})

module.exports = mongoose.model('Vacancies', vacancyScheme)
