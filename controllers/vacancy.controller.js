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
      salary: req.body.salary,
      createdBy: req.user.id,
      tags: req.body.tags,
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
    console.log(req.user)
    const vacancies = await Vacancy.find()

    const tags = vacancies.map(item => {
      return item.tags
    }).flat()

    let cnts = tags.reduce((obj, val) => {
      obj[val] = (obj[val] || 0) + 1;
      return obj;
    }, {} );
    let sorted = Object.keys(cnts).sort( function(a,b) {
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
    const keywords = req.query.keywords.split("%").join(" ")
    const keywordsArray = req.query.keywords.split("%")

    console.log('location', location)

    console.log('array', keywordsArray)

    let result
    let resultByTags

    if (location === 'GLOBAL') {
      result = await Vacancy.find({title: {$regex: keywords, $options: 'i'}})
      resultByTags = await Vacancy.find({tags: {$in: keywordsArray}})
    } else {
      result = await Vacancy.find({title: {$regex: keywords, $options: 'i'}, location})
      resultByTags = await Vacancy.find({tags: {$in: keywordsArray}, location})
    }



    result = result.concat(resultByTags)
    result = [...new Map(result.map(item => [JSON.stringify(item), item])).values()]

    res.status(200).json(result)
  } catch (e) {
    console.log(e)
  }
}

module.exports.searchByTags = async function (req, res) {
  try {
    const tags = req.query.tags.split(', ')
    console.log(tags)
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
    const vacancyExist = await User.findOne({
      favorite: {
        $elemMatch: {
          _id: req.params.id
        }
      }
    })


    if (vacancyExist) {
      const user = await User.findByIdAndUpdate(
          req.user._id,
          {$pull: {favorite: {_id: req.params.id}}},
          {new: true}
      )
      const vacancy = await Vacancy.findById({_id: req.params.id})
      await user.save()
      res.status(200).json(user)
    } else {
      const user = await User.findById(req.user._id)
      const vacancy = await Vacancy.findById({_id: req.params.id})
      user.favorite.push({_id: vacancy._id})
      await user.save()
      res.status(200).json(user)
    }
  } catch (e) {
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
      console.log(1)
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
      console.log(2)
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
