const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  const filter = req.query.category
  const regex = new RegExp(filter, 'i')
  let filterName = ''

  switch (filter) {
    case 'household':
      filterName = '家居物業'
      break
    case 'transportation':
      filterName = '交通出行'
      break
    case 'entertainment':
      filterName = '休閒娛樂'
      break
    case 'diet':
      filterName = '餐飲食品'
      break
    case 'others':
      filterName = '其他'
      break
    default:
      filterName = '類別'
  }

  Record.find({ category: regex, userId: req.user._id }, (err, records) => {
    if (err) return console.log(err)
    const isDataEmpty = records.length === 0 ? true : false
    let totalAmount = 0
    for (let record of records) {
      totalAmount += record.amount
    }
    return res.render('index', { records, filter, filterName, totalAmount, isDataEmpty })
  })
})

module.exports = router