const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  secondName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cvSrc: {
    type: String,
    default: ''
  },
  userPic: {
    type: String,
    default: 'uploads/userPics/default_user.png'
  },
  favorite: [
    {
      vacancyId: {
        type: mongoose.Types.ObjectId,
        ref: 'Vacancies',
      }
    }
  ],
  createdVacancies: [
    {
      vacancyId: {
        type: mongoose.Types.ObjectId,
        ref: 'Vacancies'
      }
    }
  ],
  applied: [
    {
      vacancyId: {
        type: mongoose.Types.ObjectId,
        ref: 'Vacancies'
      }
    }
  ]

})

module.exports = mongoose.model('Users', userSchema)
