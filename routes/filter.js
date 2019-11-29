const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  const month = req.query.month
  const category = req.query.category
  const regexCategory = new RegExp(category, 'i')
  const regexMonth = new RegExp(month, 'i')
  let categoryName = ''

  switch (category) {
    case 'household':
      categoryName = '家居物業'
      break
    case 'transportation':
      categoryName = '交通出行'
      break
    case 'entertainment':
      categoryName = '休閒娛樂'
      break
    case 'diet':
      categoryName = '餐飲食品'
      break
    case 'others':
      categoryName = '其他'
      break
    default:
      categoryName = '所有類別'
  }

  Record.find({ date: regexMonth, category: regexCategory, userId: req.user._id }).sort({ date: 'desc' }).exec((err, records) => {
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
    }
    return res.render('index', { records, category, categoryName, totalAmount, isDataEmpty, regexMonth, month })
  })
})

module.exports = router