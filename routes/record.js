const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const { authenticated } = require('../config/auth')

// 首頁
router.get('/', authenticated, (req, res) => {
  return res.redirect('/records')
})

// 完成新增
router.post('/new', authenticated, (req, res) => {
  const record = new Record({
    name: req.body.name,
    merchant: req.body.merchant,
    category: req.body.category,
    amount: req.body.amount,
    date: req.body.date,
    userId: req.user._id
  })

  record.save(err => {
    if (err) return console.log(err)
    return res.redirect('/')
  })
})

// 完成編輯
router.put('/:id', authenticated, (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user._id }, (err, record) => {
    if (err) return console.log(err)
    record.name = req.body.name
    record.merchant = req.body.merchant
    record.date = req.body.date
    record.category = req.body.category
    record.amount = req.body.amount
    record.save(err => {
      if (err) return console.log(err)
      return res.redirect('/')
    })
  })
})

// 刪除
router.delete('/:id/delete', authenticated, (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user._id }, (err, record) => {
    if (err) return console.log(err)
    record.remove(err => {
      if (err) return console.log(err)
      return res.redirect('/')
    })
  })
})

module.exports = router