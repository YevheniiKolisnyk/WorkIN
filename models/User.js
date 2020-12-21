const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  city: {
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
