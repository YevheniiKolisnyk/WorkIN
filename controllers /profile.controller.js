const User = require('../models/User')
const Vacancy = require('../models/Vacancy')

module.exports.getAll = async function (req, res) {
  try {
    const user = await User.findById(req.user._id)


    const created = await Vacancy.find({
      _id: {$in: user.createdVacancies.map(item => item._id)}
    })
    const applied = await Vacancy.find({
      _id: {$in: user.applied.map(item => item._id)}
    })
    const favorite = await Vacancy.find({
      _id: {$in: user.favorite.map(item => item._id)}
    })

    const profileInfo = {
      user,
      created,
      applied,
      favorite
    }

    res.status(200).json(profileInfo)
  } catch (e) {
    console.log(e)
  }
}

module.exports.update = async function (req, res) {
  try {
    const update = req.body
    if (req.file) {
      update.userPic = req.file.path
    }
    const user = await User.findOneAndUpdate(
        {_id: req.params.id},
        {$set: update},
        {new: true}
    )
    await user.save()


    res.status(200).json(user)
  } catch (e) {
    console.log(e)
  }
}

module.exports.addCv = async function (req, res) {
  try {
    if (req.file) {
      const user = await User.findById(req.params.id)
      user.cvSrc = req.file.path
      await user.save()
      res.status(200).json(user)
    } else {
      res.status(404).json({message: 'File not found.'})
    }
  } catch (e) {
    console.log(e)
  }
}
