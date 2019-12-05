const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  Record.find({ userId: req.user._id }).sort({ date: 'desc' }).exec((err, records) => {
    if (err) return console.log(err)
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
        default:
          record.others = true
      }
      record.formatDate = record.date.getFullYear() + '-' + (Number(record.date.getMonth()) + 1) + '-' + record.date.getDate()
    }
    return res.render('index', { records, totalAmount })
  })
})

module.exports = router