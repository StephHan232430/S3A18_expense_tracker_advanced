const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  const month = req.query.month
  const category = req.query.category
  let selectHousehold = false
  let selectTransportation = false
  let selectEntertainment = false
  let selectDiet = false
  let selectOthers = false
  let selectAllCategories = false
  let filter = { userId: req.user._id }

  switch (category) {
    case 'household':
      selectHousehold = true
      break
    case 'transportation':
      selectTransportation = true
      break
    case 'entertainment':
      selectEntertainment = true
      break
    case 'diet':
      selectDiet = true
      break
    case 'others':
      selectOthers = true
      break
    case '':
      selectAllCategories = true
      break
    default:
      selectHousehold = false
      selectTransportation = false
      selectEntertainment = false
      selectDiet = false
      selectOthers = false
      selectAllCategories = false
  }

  if (category !== '') {
    if (month !== '') {
      filter.date = {
        "$gte": new Date(`${month}-1`),
        "$lte": new Date(`${month}-31`)
      }
    }
    filter.category = category
  }

  if (month !== '') {
    if (req.session.category) {
      filter.category = req.session.category
    }
    filter.date = {
      "$gte": new Date(`${month}-1`),
      "$lte": new Date(`${month}-31`)
    }
  }

  Record.find(filter).sort({ date: 'desc' }).exec((err, records) => {
    if (err) return console.log(err)
    const isDataEmpty = records.length === 0 ? true : false
    let totalAmount = 0
    for (let record of records) {
      totalAmount += record.amount
      switch (record.category) {
        case 'household':
          record.household = true
          break
        case 'transportation':
          record.transportation = true
          break
        case 'entertainment':
          record.entertainment = true
          break
        case 'diet':
          record.diet = true
          break
        case 'others':
          record.others = true
          break
        default:
          record.household = false
          record.transportation = false
          record.entertainment = false
          record.diet = false
          record.others = false
      }
      record.formatDate = record.date.getFullYear() + '-' + (Number(record.date.getMonth()) + 1) + '-' + record.date.getDate()
    }

    return res.render('index', { records, category, selectHousehold, selectTransportation, selectEntertainment, selectDiet, selectOthers, selectAllCategories, totalAmount, isDataEmpty, month })
  })
})

module.exports = router