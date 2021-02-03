const Vacancy = require('../models/Vacancy')
const User = require('../models/User')
const moment = require('moment')

module.exports.create = async function (req, res) {
  try {
    const vacancy = await new Vacancy({
      title: req.body.title,
      companyName: req.body.companyName,
      location: req.body.location,
      expiryTime: moment().add(req.body.expiryTime, 'd'),
      contractType: req.body.contractType,
      workTime: req.body.workTime,
      experience: req.body.experience,
      description: req.body.description,
      expectations: JSON.parse(req.body.expectations),
      responsibilities: JSON.parse(req.body.responsibilities),
      benefits: JSON.parse(req.body.benefits),
      salary: req.body.salary,
      createdBy: req.user.id,
      tags: JSON.parse(req.body.tags),
    })

    if (req.file) {
      vacancy.companyPic = req.file.path
    }

    await vacancy.save()

    const user = await User.findById(req.user._id)
    user.createdVacancies.push(vacancy)
    await user.save()

    res.status(201).json(vacancy)
  } catch (e) {
    console.log(e)
  }
}

module.exports.getAll = async function (req, res) {
  try {
    const vacancies = await Vacancy.find()

    const tags = vacancies.map(item => {
      return item.tags
    }).flat()

    let cnts = tags.reduce((obj, val) => {
      obj[val] = (obj[val] || 0) + 1;
      return obj;
    }, {});
    let sorted = Object.keys(cnts).sort(function (a, b) {
      return cnts[b] - cnts[a];
    })

    sorted.length = 6

    const response = {
      vacancies,
      tags: sorted
    }

    res.status(200).json(response)
  } catch (e) {
    console.log(e)
  }
}

module.exports.search = async function (req, res) {
  try {
    const location = req.query.location
    let keywords
    let keywordsArray
    let result
    let resultByTags

    if (req.query.keywords === 'ALL') {
      result = await Vacancy.find({location})
    } else {
      keywords = req.query.keywords.split(", ").join(" ")
      keywordsArray = req.query.keywords.split("%")

      if (location === 'GLOBAL') {
        result = await Vacancy.find({title: {$regex: keywords, $options: 'i'}})
        resultByTags = await Vacancy.find({tags: {$in: keywordsArray}})
      } else {
        result = await Vacancy.find({title: {$regex: keywords, $options: 'i'}, location})

        resultByTags = await Vacancy.find({tags: {$in: keywordsArray}, location})
      }

      result = result.concat(resultByTags)
      result = [...new Map(result.map(item => [JSON.stringify(item), item])).values()]
    }


    res.status(200).json(result)
  } catch (e) {
    console.log(e)
  }
}

module.exports.searchByTags = async function (req, res) {
  try {
    const tags = req.query.tags.split(', ')
    const result = await Vacancy.find({tags: {$all: tags}})
    res.status(200).json(result)
  } catch (e) {
    console.log(e)
  }
}

module.exports.getById = async function (req, res) {
  try {
    const vacancy = await Vacancy.findById({_id: req.params.id})
    res.status(200).json(vacancy)
  } catch (e) {
    console.log(e)
  }
}

module.exports.subscribe = async function (req, res) {
  try {
    const user = await User.findById(req.user._id)
    const vacancy = await Vacancy.findById(req.params.id)

    if (user.favorite.some(item => String(item._id) === String(vacancy._id))) {
      const user = await User.findByIdAndUpdate(
          req.user._id,
          {$pull: {favorite: {_id: req.params.id}}},
          {new: true}
      )
      const vacancy = await Vacancy.findByIdAndUpdate(
          req.params.id,
          {$pull: {subscribers: {_id: req.user._id}}},
          {new: true}
      )
      await user.save()
      await vacancy.save()
      res.status(200).json({user, vacancy})
    } else {
      user.favorite.push({_id: vacancy._id})
      vacancy.subscribers.push({_id: user._id})
      await vacancy.save()
      await user.save()
      res.status(200).json({user, vacancy})
    }
  } catch
      (e) {
    console.log(e)
  }
}

module.exports.apply = async function (req, res) {
  try {
    const alreadyApplied = await User.findOne({
      applied: {
        $elemMatch: {
          _id: req.params.id
        }
      }
    })

    if (alreadyApplied) {
      const user = await User.findByIdAndUpdate(
          req.user._id,
          {$pull: {applied: {_id: req.params.id}}},
          {new: true}
      )
      const vacancy = await Vacancy.findByIdAndUpdate(
          req.params.id,
          {$pull: {applicants: {_id: req.user._id}}},
          {new: true})

      await user.save()
      await vacancy.save()
      res.status(200).json(vacancy)
    } else {
      const user = await User.findById(req.user._id)
      const vacancy = await Vacancy.findById(req.params.id)

      user.applied.push({_id: vacancy._id})

      vacancy.applicants.push({_id: user._id, cvSrc: 'string'})

      await user.save()
      await vacancy.save()
      res.status(200).json(vacancy)
    }
  } catch (e) {
    console.log(e)
  }
}

module.exports.delete = async function (req, res) {
  try {
    const vacancy = await Vacancy.findById(req.params.id)
    if (vacancy.createdBy.equals(req.user._id)) {
      vacancy.deleteOne()
      res.status(200).json({message: 'Your vacancy has been deleted!'})
    } else {
      res.status(401).json({message: 'It looks like you are trying to delete something that you did not create.'})
    }

  } catch (e) {
    console.log(e)
  }
}
