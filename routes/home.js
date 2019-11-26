const express = require('express')
const router = express.Router()
const Record = require('../models/record')

router.get('/', (req, res) => {
  Record.find((err, records) => {
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
    }
    return res.render('index', { records, totalAmount })
  })
})

module.exports = router