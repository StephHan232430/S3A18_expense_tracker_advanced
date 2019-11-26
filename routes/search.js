const express = require('express')
const router = express.Router()
const Record = require('../models/record')

router.get('/', (req, res) => {
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

  Record.find({ category: regex }, (err, records) => {
    if (err) return console.log(err)
    const isDataEmpty = records.length === 0 ? true : false
    return res.render('index', { records, filter, filterName, isDataEmpty })
  })
})

module.exports = router